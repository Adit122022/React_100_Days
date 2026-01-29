# ⚛️ Mastering React Logic: The 100-Project Journey

**Goal:** Build. Break. Learn. Repeat.

Welcome to the definitive guide to my **100 Days of Code** challenge. This repository is not just a collection of random apps; it is a structured deep-dive into **Building React Logic**.

From bridging the gap between vanilla JavaScript and React state to mastering complex asynchronous data flows, this project (00-99) covers it all.

---

## 📖 About This Guide

This repository serves as a roadmap for mastering modern frontend development. Each folder represents a specific challenge designed to isolate and conquer a particular concept in **React Logic**.

### Core Philosophy: "Logic First, UI Second"

While the UIs are polished, the primary focus here is on the _engine_ under the hood:

- **State Management**: Moving from `useState` to `useReducer` and global stores like **Zustand**.
- **Data Flow**: Mastering props, context, and server-state synchronization.
- **Side Effects**: Handling API calls, subscriptions, and DOM manipulations safely with `useEffect`.
- **Performance**: Memoization patterns (`useMemo`, `useCallback`) and render optimization.

---

## 🌟 The "Bonus" Full-Stack Epics

_Advanced System Design & End-to-End Logic_

Before diving into the logic drills, these two projects represent the culmination of many smaller lessons—fully functional, full-stack applications built with **Next.js**.

### 1. **[Setsuna (刹那)](./Setsuna(刹那))**

> **Concept**: _Ephemeral Data Architecture & Real-Time WebSockets_
>
> A real-time chat app where privacy is enforced by logic: every room physically self-destructs after 10 minutes.

- **Key Logic**: handling strict TTL (Time-To-Live) data, synchronizing server-client state instantly, and ensuring type-safety across the network boundary using **Elysia Eden**.

### 2. **[E-Commerce Platform](./E-com)**

> **Concept**: _Complex State & Transactional Logic_
>
> A production-grade shopping platform.

- **Key Logic**: Cart management (persistence vs. session), authentication flows, and payment gateway integration.

---

## ⚡ Logic Building Blocks (Projects 00 - 99)

This section tracks the incremental journey. Each project targets a specific logical hurdle.

| #      | Project Name                                         | The Logic Constraint / Lesson                                                                                             |
| :----- | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **00** | **[Movie App](./00_Movie_App)**                      | **Fetching & Rendering**: Handling async data fetching, loading states, and conditional rendering based on API responses. |
| **01** | **[Gradient Generator](./01_grdaient-generator)**    | **DOM & Style Manipulation**: translating user input state directly into dynamic CSS properties interactively.            |
| **02** | **[Avatar Generator](./02_Avatar-generator)**        | **Randomization Logic**: algorithmic generation of visual assets based on seed strings.                                   |
| **03** | **[Image Gallery](./03_imagegallery)**               | **Layout Logic**: implementing complex grid calculations and handling media loading events.                               |
| **04** | **[Thumbnail Downloader](./04_Thubnail_downloader)** | **String Manipulation**: parsing URL strings to extract video IDs and constructing valid asset endpoints.                 |
| **05** | **[Zustand Task Manager](./05_ZustandReactTask)**    | **Global State**: breaking free from prop-drilling by implementing an atomic global store with **Zustand**.               |
| **07** | **[ChatBot](./07_ChatBot)**                          | **Conversational State**: managing a linear array of message objects and simulating asynchronous AI responses.            |
| **09** | **[QR Generator](./09_QR_Generator)**                | **Data Encoding**: transforming text strings into 2D matrix visual data on the fly.                                       |
| **10** | **[Expense Tracker](./10_Expence_Tracker)**          | **Math & Aggregation**: real-time calculation of totals, filtering arrays by category, and visualizing numerical data.    |

> _...tracking up to 99 projects._

---

## 🛠️ The Logic Stack

The tools chosen are specifically for testing different mental models of programming.

- **React (Core)**: The library for building user interfaces.
- **TypeScript**: Enforcing logic correctness at compile time.
- **TanStack Query**: For removing "fetching" logic from components.
- **Zustand**: For simplifying complex global state updates.

---

**"Code is not just syntax; it is thought made executable."**
_This readme acts as the manifest for that timeline._
