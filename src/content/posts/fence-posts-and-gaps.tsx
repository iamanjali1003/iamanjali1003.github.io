import { FencePostDiagram } from "@/components/blog/fence-post-diagram"
import { Code, CodeBlock, H2, List, P, Table, TextLink } from "@/components/blog/prose"

const REPO = "https://github.com/kubernetes-sigs/inference-perf"
const ISSUE = "https://github.com/kubernetes-sigs/inference-perf/issues/821"
const PR = "https://github.com/kubernetes-sigs/inference-perf/pull/1055"
const FOLLOW_UP = "https://github.com/kubernetes-sigs/inference-perf/issues/1070"

const BEFORE = `send_duration = max(starts) - min(starts)
achieved_rate = len(metrics) / send_duration`

const AFTER = `achieved_rate = (len(metrics) - 1) / send_duration`

const SIMULATION = `import numpy as np

rng = np.random.default_rng()
n, rate = 600, 40.0
duration = n / rate

# Like inference-perf's constant timer: random gaps, scaled to fill the duration.
gaps = rng.exponential(1 / rate, (100_000, n))
gaps *= duration / gaps.sum(axis=1, keepdims=True)
sends = gaps.cumsum(axis=1)
span = sends[:, -1] - sends[:, 0]

old = n / span
new = (n - 1) / span
print(f"old: {old.mean():.2f}/s, too high in {np.mean(old > rate):.0%} of runs")
print(f"new: {new.mean():.2f}/s, too high in {np.mean(new > rate):.0%} of runs")`

const OUTPUT = `old: 40.07/s, too high in 100% of runs
new: 40.00/s, too high in 37% of runs`

export default function FencePostsAndGaps() {
  return (
    <>
      <P>
        My first pull request to Kubernetes changed one line of math. This post is about that line: what was wrong with
        it, how wrong, and why a one-line fix still touched five files.
      </P>

      <H2>The tool</H2>
      <P>
        <TextLink href={REPO}>inference-perf</TextLink> is a Kubernetes project for benchmarking LLM inference servers
        like vLLM and SGLang. You give it a load, say 40 requests per second for 15 seconds. It sends requests on that
        schedule, records when each one went out and when it came back, and writes a report.
      </P>
      <P>
        One number in that report is <Code>achieved_rate</Code>: how fast requests actually went out. You read it next
        to <Code>requested_rate</Code>, the rate you asked for. If the achieved rate falls well short, the server
        couldn’t keep up, and every latency number in that stage describes an overloaded server, not the load you
        configured. So this one number decides whether you can trust the rest of the report.
      </P>

      <H2>The bug</H2>
      <P>Simplified a little, the report worked it out like this:</P>
      <CodeBlock code={BEFORE} label="Before" />
      <P>Picture five requests sent one second apart, at 0, 1, 2, 3 and 4 seconds.</P>
      <FencePostDiagram />
      <P>
        From the first send to the last is 4 seconds. Five requests over 4 seconds is 1.25 per second. But the requests
        went out once a second, so the real rate is 1.0.
      </P>
      <P>
        It’s the fence-post problem: five posts, four gaps. A rate is about the gaps between sends, and five sends only
        have four gaps between them. The fix divides by the gaps:
      </P>
      <CodeBlock code={AFTER} label="After" />

      <H2>How wrong was it?</H2>
      <P>
        Counting n requests instead of n − 1 gaps inflates the rate by n ÷ (n − 1). How much that matters depends on how
        many requests a stage sends:
      </P>
      <Table
        head={["Requests", "Reported", "Real", "Too high by"]}
        rows={[
          ["2", "2.0", "1.0", "100%"],
          ["5", "1.25", "1.0", "25%"],
          ["30", "1.034", "1.0", "3.4%"],
          ["600", "1.0017", "1.0", "0.17%"],
        ]}
      />
      <P>
        Short stages were badly off. Long ones were almost right, and nobody spots 0.17% by looking at one report. The
        bug wasn’t hidden, though. A test already pinned the old value, with a note saying it asserted “the shipped
        definition rather than the intended one”, pointing at the issue I picked up,{" "}
        <TextLink href={ISSUE}>#821</TextLink>.
      </P>

      <H2>Biased, not just noisy</H2>
      <P>
        Real schedules aren’t perfectly even. The constant-rate timer in inference-perf adds a little randomness to each
        gap, so the achieved rate wobbles from run to run. That part is fine: noise averages out.
      </P>
      <P>
        The old formula did something worse than wobble. It was biased: it came out high in every single run. A short
        simulation shows it, with 600 requests at 40 per second and the gaps drawn the way the timer draws them:
      </P>
      <CodeBlock code={SIMULATION} />
      <CodeBlock code={OUTPUT} label="Output" />
      <P>
        With the old formula, every run overshoots. With the new one, the average lands on 40 and runs fall on both
        sides of it. Only 37% come out high rather than half, because the error is lopsided: most runs land slightly
        under, and a few land further over.
      </P>
      <P>
        That difference matters more than the size of the error. Running a benchmark more times shrinks noise. It never
        shrinks bias: every report drifts the same way.
      </P>

      <H2>Why one line touched five files</H2>
      <List
        items={[
          <>The report code itself.</>,
          <>
            An end-to-end test helper that recomputes the rate from the raw send times, to cross-check the report. It
            used the same formula, so it had to change in the same PR, or the cross-check would have failed against the
            fixed report.
          </>,
          <>
            Four tests across two files that pinned the old numbers: 1.25 became 1.0, 4 ÷ 1.5 became 3 ÷ 1.5, and so on.
            In this project a test is pinned behavior. You don’t edit one to make it pass. You say in the PR which
            behavior changed and why.
          </>,
          <>
            A sample report in the docs. It showed 30 requests over 29.6 seconds reaching 1.013 against a requested 1.0.
            Recomputed from its own numbers, it reads 0.980.
          </>,
        ]}
      />
      <P>
        Before the fix, the updated tests failed on main, and the PR quoted that failure. The project asks for exactly
        that: show the test failing first, then show the fix making it pass.
      </P>

      <H2>What I left alone</H2>
      <P>
        One request, or a burst sent at the same instant, gives a send window of zero seconds. The report shows{" "}
        <Code>0.0</Code> for that, which reads like “no throughput”. “No value” would be more honest, but it changes the
        report format other tools read, so it’s the maintainers’ call. I asked on the issue and kept it out of the PR.
      </P>

      <H2>What happened next</H2>
      <P>
        A maintainer reviewed it, the end-to-end rate test passed for both constant and Poisson arrivals, and it{" "}
        <TextLink href={PR}>merged</TextLink> the next day. In the same review they opened a{" "}
        <TextLink href={FOLLOW_UP}>follow-up issue</TextLink>: three places in comments and docs still described the old
        math. That’s my next PR.
      </P>

      <H2>What I’d tell myself a week ago</H2>
      <List
        items={[
          <>
            <strong className="font-semibold text-foreground">Claim before you code.</strong> The first two issues I
            wanted were picked up by another contributor overnight, before I’d commented.
          </>,
          <>
            <strong className="font-semibold text-foreground">Read the contributing guide first.</strong> This project
            wants an issue assigned before a PR, a test that fails first, and a set PR format. Following it is half of a
            fast review.
          </>,
          <>
            <strong className="font-semibold text-foreground">Small and clear beats big and clever.</strong> One idea per
            PR is easy to review, and easy to merge.
          </>,
        ]}
      />
    </>
  )
}
