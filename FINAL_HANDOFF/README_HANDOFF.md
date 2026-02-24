# PRO TUVITOOL ENGINE (FINAL HANDOFF)

## 1. Overview
This is the core engine for the "Soulful Life Coach" Tử Vi application.
It calculates the Zi Wei Dou Shu (Tử Vi Đẩu Số) chart, interprets the stars (including interactions/combos), and integrates with Gemini AI to generate "Life Coach" style reports.

### Key Logic Implemented:
-   **Solar <-> Lunar Conversion**: Full Can-Chi support.
-   **Chart Calculation**: Places 100+ stars (Main, Auxiliary, Rings).
-   **Dai Van (Decade Cycle)**: Calculates correct age range and direction (Thuận/Nghịch).
-   **Interpretation Layer**:
    -   Detailed meanings for Main Stars.
    -   **Star Combinations (Cách Cục)**: Detects special patterns (e.g., Lộc Phùng Xung Phá, Tham Hỏa, Không Kiếp).
    -   Auxiliary Rings: Thái Tuế, Bác Sỹ, Trường Sinh.
-   **AI Integration**:
    -   `prompt_builder_v1.js`: Constructs highly detailed context (including Combos, Triads, Tieu Han) for the LLM.
    -   `gemini_service_v1.js`: Interface to Google Gemini API.

## 2. Directory Structure

-   `coreEngineV1.js`: The brain. Orchestrates Chart Building -> Context Logic -> Interpretation.
-   `server_engine.js`: The Main Entry Point. Runs the Full Flow (Input -> Chart -> Prompt -> AI -> Report).
-   `prompt_builder_v1.js`: Logic to format data for Gemini.
-   `tests_and_debug/`: Contains verification scripts used during development (1989 case, 1976 case, Dai Van checks, etc.).
-   `utils_placements.js` & `main_stars_and_palaces_v51.js`: Low-level astronomical logic.

## 3. Installation

```bash
npm install
```
(Requires `@google/generative-ai` and `dotenv`)

## 4. Usage

### A. Run the Full Engine (CLI / Server Mode)
This script accepts input, builds the chart, and (if API Key is present) calls Gemini.

```bash
node server_engine.js
```
*Note: Ensure `GEMINI_API_KEY` is set in `.env` for AI features.*

To pass arguments via CLI (JSON string):
```bash
node server_engine.js '{"name":"Test User","dob":"1989-12-28","gender":"Nam","calendarType":"lunar","tob":"06:30","timeZone":7}'
```

### B. Verify Logic (Test Scripts)
You can find validated test cases in `tests_and_debug/`.

**Example: Check the 1989 "Soulful Life Coach" Case**
```bash
node tests_and_debug/run_1989_case.js
```
This script acts as the "Gold Standard" verification for:
-   Correct Mệnh at Tuất (Tham Lang).
-   Correct Dai Van at Tử Tức (37-46).
-   Correct Detection of "Lộc Phùng Xung Phá".

**Example: Demo the Full AI Flow (Simulated)**
```bash
node tests_and_debug/demo_gen_content.js
```
This script runs the engine and PRINTS the exact Prompt that would be sent to Gemini, allowing you to debug the "Soulful Life Coach" inputs.

## 5. Environment Variables
Create a `.env` file in this directory:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

## 6. Development Notes
-   **Adding New Stars**: Update `utils_placements.js`.
-   **Changing AI Persona**: Edit `prompt_builder_v1.js` (Role & Tone sections).
-   **Frontend Integration**: The output of `server_engine.js` is a JSON object containing `{ html_report: "...", data: {...} }`. The Frontend should simply display the HTML and use the JSON data for UI widgets.
