# { "Depends": "py-genlayer:test" }
from genlayer import *
import json

class MochiJudge(gl.Contract):
    total_matches: u64
    ai_matches: u64

    def __init__(self):
        self.total_matches = 0
        self.ai_matches = 0

    @gl.public.view
    def get_stats(self) -> dict:
        return {
            "total_matches": int(self.total_matches),
            "ai_matches": int(self.ai_matches)
        }

    @gl.public.write
    def judge_match(self, card1: str, card2: str) -> str:
        def nondet() -> str:
            prompt = f"""You are Mochi, a cute AI judge for a memory card game built on GenLayer blockchain.

Two cards have been flipped:
Card 1: "{card1}"
Card 2: "{card2}"

Decide if these two cards are a valid semantic match.
They match if they are:
- The same concept
- Closely related GenLayer/blockchain/AI concepts
- Synonyms or direct equivalents

Examples of valid matches:
- "Validator" and "Consensus" = match
- "AI" and "LLM" = match  
- "Smart Contract" and "Intelligent Contract" = match
- "Mochi" and "Mochi" = match

Examples of invalid matches:
- "Validator" and "Wallet" = no match
- "AI" and "Blockchain" = no match

Respond with ONLY valid JSON:
{{"is_match": true, "reason": "one short sentence"}}
or
{{"is_match": false, "reason": "one short sentence"}}"""

            result = gl.exec_prompt(prompt)
            result = result.replace("```json", "").replace("```", "").strip()
            parsed = json.loads(result)
            return json.dumps({"is_match": parsed["is_match"], "reason": parsed["reason"]}, sort_keys=True)

        raw = gl.eq_principle_strict_eq(nondet)
        parsed = json.loads(raw)

        self.total_matches += 1
        if parsed["is_match"]:
            self.ai_matches += 1

        return json.dumps({
            "is_match": parsed["is_match"],
            "reason": parsed["reason"]
        })
