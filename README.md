# Mochi Memory — AI-Judged Memory Game on GenLayer

A memory card game where Mochi the AI judge uses GenLayer's Intelligent Contracts and Optimistic Democracy to decide if two flipped cards are a valid semantic match.

## Demo Video

https://x.com/Lolyy_001/status/2036835169357681108

## Live App

https://mochi-memory.vercel.app/

## How GenLayer powers the core mechanic

1. Player flips two cards
2. If cards have different IDs, the game calls the MochiJudge Intelligent Contract
3. 5 AI validators reach consensus using `gl.eq_principle_strict_eq()` and `gl.exec_prompt()`
4. Mochi decides if the two cards are a semantic match
5. The verdict and transaction hash are returned and affect gameplay

AI consensus is the core mechanic — not decoration.

## GenLayer Integration

**Contract file:** `mochi_judge.py`
**Contract address:** `0x82b0311B4eE4aeCF1F22eD540C940E185F7CE5f1`
**Network:** Bradbury Testnet
**SDK:** genlayer-js

## Tech Stack

- React + TypeScript + Vite
- GenLayer Intelligent Contract (Python)
- genlayer-js SDK
- Framer Motion
- Tailwind CSS
- Deployed on Vercel

## Run locally

```bash
npm install
npm run dev
```
