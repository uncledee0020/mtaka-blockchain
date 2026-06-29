# M-Taka Blockchain Engine

M-Taka is a circular economy solution designed to track e-waste lifecycles and reward users with green credits redeemable for M-Pesa, data bundles, and airtime. This repository houses the custom, lightweight cryptographic ledger that guarantees traceable and auditable tracking for all e-waste transactions.

---

## 🛠️ Blockchain Technology Stack

Unlike applications that build on public networks like Ethereum or Polygon, M-Taka utilizes a **custom, proprietary private blockchain architecture** built completely from scratch.

* **Cryptographic Engine:** Powered by **SHA-256** hashing via `crypto-js` to enforce data integrity and secure block linking.
* **Consensus & Architecture:** Functions as a **Centralized Private Ledger** (Single-Node Proof-of-Authority style), optimized for ultra-fast, zero-gas-fee transactions suited for high-volume backend microservices.
* **Storage Layer:** Operates as an **In-Memory Ledger** for development and rapid hackathon prototyping.

---

## 🚀 Getting Started

Follow these steps to set up and run the M-Taka blockchain engine locally.

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your machine.

### 1. Installation
Clone your repository, navigate to the project directory, and install the required dependencies:

```bash
npm install express crypto-js
```

### 2. Run the Server
Start the blockchain API server locally:

```bash
node Server.js
```
The server will boot up and listen for requests on `http://localhost:3000`.

---

## 📡 API Reference & Endpoints

You can interact with the M-Taka engine using tools like Postman, cURL, or your frontend application.

### 1. Record an E-Waste Event
* **Endpoint:** `POST /record`
* **Payload Example:**
```json
{
  "event": "RECYCLED",
  "userId": "user_254712345678",
  "deviceId": "imei_990000123456789",
  "deviceType": "Smartphone",
  "reward": 50,
  "co2Saved": 2.1
}
```

### 2. Fetch the Full Blockchain
* **Endpoint:** `GET /chain`

### 3. Verify Ledger Integrity
* **Endpoint:** `GET /validate`
* **Returns:** `{ "valid": true }` (Checks for data tampering)

### 4. Fetch Live Impact Stats
* **Endpoint:** `GET /stats`
* **Returns:** Accumulated metrics for CO2 saved, total devices processed, and rewards distributed.

### 5. Simulate a Cyber Attack (Demo Feature)
* **Endpoint:** `GET /tamper`
* **Description:** Maliciously edits data in a block to showcase how the validation engine catches security breaches live.
