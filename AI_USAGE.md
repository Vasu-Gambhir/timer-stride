# 🤖 AI Tool Usage Documentation

This project was developed with assistance from Lovable AI and OpenAI’s ChatGPT (GPT-4). Below is a breakdown of how and where AI tools were used.

## 🧠 LLM Model Used

- ChatGPT (GPT-4) via OpenAI

## 📌 Prompts Provided

### Prompt 1

> Framework: ReactJS  
> Task Requirements

> 1. List of Timers Screen:

> - Display a list of timers
> - Each list item should show relevant details provided in the design
> - Pressing the play/pause button should run or pause the timer
> - Skip implementing different tabs (favorite, odoo etc)
> - Skip implementing the bottom navigation bar (recents, projects etc)
> - Plus button in the AppBar should take user to create timer screen

> 2. Create Timer Screen:

> - Implement a form to create a new timer
> - Include dropdowns for selecting projects and tasks
> - Add a text input for the timer description
> - Include a checkbox for marking the timer as a favorite
> - Upon adding a timer user should return to the list of timers screen

> 3. Task Details Screen:

> - Display details of a selected task in the details tab (you can use random or static deadline and assigned to values)
> - Show the running timer-related details and description in the timesheets tab. Pressing play/pause should run or pause the timer. Pressing stop will mark it as completed
> - Updating the timer state should reflect on the list of timer screen and vice-versa
> - Show normal completed timers (Optional)
> - Show expandable completed timers (Optional)

> 4. In-Memory Data Management:

> - All data (timers, projects, tasks) should be managed in-memory. In-memory data management is perfectly fine for this assignment
> - Bonus: You can implement data persistence if you want to showcase additional skills, but it's not required

> 5. Theme and Styling:

> - Implement theme styles according to the provided design system in Figma
> - Ensure the UI matches the Figma designs

> 6. State Management:

> - Implement proper state management across the application following framework best practices
> - Deep linking: Ensure all screens/pages are accessible via direct URLs and can be bookmarked

> lets build the whole application step by step and we will be using react, redux, tailwind, react-router and TypeScript as our stack

### Prompt 2

> The UI looks good but the functionality has some issues:
>
> - Pause increases timer randomly
> - Stop and clear missing
> - New timer not added correctly
> - Favorite should be a checkbox and toggleable in favorites tab

## 🔍 Summary

The AI was used to:

- Architect the entire app structure
- Guide TypeScript integration and Redux logic
- Assist in implementing localStorage persistence
- Generate Tailwind CSS-based UI to match Figma pixel-perfectly
- Write this documentation

---
