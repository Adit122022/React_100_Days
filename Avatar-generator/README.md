
---

# 🎭 Avatar Generator

A **React-based Avatar Generator** that lets you create random avatars (illustrations, cartoons, sketches, robots, pixel art, and real male/female avatars). You can **change, copy, or download** avatars instantly.

This project uses **React, TailwindCSS, Animate.css, Remix Icons, and React-Toastify** for smooth UI and UX.

---

## 🚀 Features

* 🎨 Generate random avatars of different styles.
* 👨 Male & 👩 Female real avatars using [randomuser.me](https://randomuser.me).
* 🖼️ Different illustration styles powered by [Dicebear API](https://www.dicebear.com/).
* 📥 Download avatars as images.
* 📋 Copy avatar image URL with one click.
* 📱 Fully responsive (works on mobile, tablet, and desktop).
* ✨ Beautiful UI with animations and gradients.

---

## 🛠️ Tech Stack

* **React** – Frontend framework.
* **Tailwind CSS** – Styling.
* **Animate.css** – Animations.
* **Remix Icons** – Icons.
* **React-Toastify** – Toast notifications.
* **Dicebear API** – Avatar illustrations.
* **RandomUser API** – Male & Female avatars.

---

## 📂 Project Structure

```
avatar-generator/
│── public/
│   └── avt.jpg         # Default avatar
│
│── src/
│   ├── App.jsx         # Main App component
│   ├── data.js         # Avatar options (male, female, illustration, cartoon, etc.)
│   └── index.css       # Tailwind + global styles
│
│── package.json        # Dependencies
│── README.md           # Documentation
```

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/avatar-generator.git
cd avatar-generator
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the app

```bash
npm run dev
```

Now open 👉 `http://localhost:5173/` in your browser.

---

## 📦 Dependencies

Install these packages if not already included:

```bash
npm install react-toastify animate.css remixicon
```

Also make sure Tailwind CSS is set up:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add Tailwind setup in `tailwind.config.js` and `index.css`.

---

## 🧩 Code Explanation

### `data.js`

This file stores avatar types and their APIs:

```js
export const data = [
  { label: "Illustration", value: "illustration", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=" },
  { label: "Cartoon", value: "cartoon", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=" },
  { label: "Sketchy", value: "sketchy", url: "https://api.dicebear.com/7.x/croodles/svg?seed=" },
  { label: "Robots", value: "robots", url: "https://api.dicebear.com/7.x/bottts/svg?seed=" },
  { label: "Art", value: "art", url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=" },
  { label: "Male", value: "male", url: "https://randomuser.me/api/portraits/men" },
  { label: "Female", value: "female", url: "https://randomuser.me/api/portraits/women" }
]
```

### `App.jsx`

Main logic:

* **generate()** → Creates avatar URL.
* **download()** → Downloads avatar.
* **copy()** → Copies avatar URL to clipboard.
* **useEffect()** → Auto-generates avatar on load or when option changes.

Example:

```jsx
const generate = () => {
  const obj = data.find((item) => item.value === option)
  const url = obj.url
  if (option === "male" || option === "female") {
    const imageUrl = `${url}/${Math.floor(Math.random() * 99) + 1}.jpg`
    setSrc(imageUrl)
  } else {
    const uniqueValue = Date.now()
    const imageUrl = `${url}${uniqueValue}`
    setSrc(imageUrl)
  }
}
```

---

## 🎨 UI Preview

### Default View

![avatar preview](https://via.placeholder.com/400x250.png?text=Avatar+Generator+Preview)

* Dropdown for selecting avatar type.
* Avatar displayed inside a circle.
* URL of avatar shown below dropdown.
* Buttons for **Change**, **Download**, and **Copy**.

---

## 📖 How It Works (Step by Step for Beginners)

1. **Choose an option** (Male, Female, Cartoon, Robots, etc.) from dropdown.
2. App fetches avatar URL from API and updates the state.
3. Avatar image gets updated in UI.
4. User can:

   * 🔄 Click **Change** → Generate a new avatar.
   * 📥 Click **Download** → Save avatar as `.jpg`.
   * 📋 Click **Copy** → Copy URL to clipboard.

---

## 🔮 Future Improvements

* Save favorite avatars.
* Add background patterns/colors.
* Allow custom names as seeds for avatars.
* Download in multiple formats (PNG, SVG).

---

## 👨‍💻 Author

Made with ❤️ by **Aditya Sharma**

---
