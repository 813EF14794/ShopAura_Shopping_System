# ShopAura — Shopping System Demo

ShopAura is an attractive, responsive shopping storefront made with HTML, CSS, and vanilla JavaScript. This project is suitable for practising Git and GitHub version control for a DevOps lab activity.

## Features
- Modern responsive shopping homepage
- Product cards with category filters
- Search products by name or category
- Add products to a shopping bag
- Increase/decrease quantity and remove cart items
- Automatic subtotal, shipping and total calculation
- Demo checkout message (no real payment processing)
- Newsletter form interaction
- Mobile navigation menu

## Technologies
- HTML5
- CSS3
- JavaScript (no external package installation needed)

## Run locally
1. Extract `ShopAura_Shopping_System.zip`.
2. Open the `ShopAura_Shopping_System` folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the Live Server extension.

## Suggested DevOps Activity 2
Use your own GitHub repository, clone it to your laptop, add this project or use an existing repository as directed by your faculty, make a small change, then commit and push.

Example commands after a repository is cloned and configured:

```bash
git status
git add .
git commit -m "Updated shopping system for Activity 2"
git push
git status
git log -1 --oneline
```

If you start from this ZIP instead of a cloned repository, create a GitHub repository and connect it to the local project before pushing. Do not commit passwords, API keys, or private information.

## Folder structure
```text
ShopAura_Shopping_System/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## Academic note
This is a front-end demonstration. Products are sample data, cart contents are held in browser memory, and checkout does not take payments. A real e-commerce system would need a backend, database, authentication, order management, and payment-provider integration.
