# MenuApp

A dynamic and multilingual digital menu application designed to showcase restaurant offerings with a modern and intuitive user interface. This project allows businesses to easily display their menus, complete with product categories, descriptions, prices, and even images, all while providing a pleasant Browse experience for customers.

---

## ✨ Features

* **Dynamic Menu Display**: Fetches and renders menu data based on a unique ID and locale.
* **Multilingual Support**: The application offers **full multilingual support**, with content and UI constants adapting based on the selected language (e.g., English, Portuguese). This ensures a tailored experience for diverse users.
* **Theme Toggling**: Users can easily switch between **light and dark themes** for improved readability and personalization, with a smooth transition. This is dynamically applied using a utility function (`themedClassName`) that intelligently appends dark mode styles when active, creating a seamless visual experience.
* **Product Details**: Displays product names, descriptions, prices, and images for a comprehensive view.
* **Visit Counter**: Tracks and displays the number of visits a specific menu has received today, resetting daily.
* **Responsive Design**: Built with Next.js and styled with CSS Modules, ensuring a responsive and visually appealing layout across various devices.
* **Clear and Modern UI**: Features a clean design with well-defined sections for categories and products, enhancing user navigation.
* **Error Handling**: Gracefully handles cases where menu data is not found or an error occurs during fetching.

---

## 🚀 Technologies Used

* **Next.js**: React framework for building the web application, providing server-side rendering and routing.
* **React**: JavaScript library for building user interfaces.
* **TypeScript**: Strongly typed superset of JavaScript, enhancing code quality and maintainability.
* **CSS Modules**: For scoped and modular styling, ensuring clean and maintainable stylesheets for the UI.

---

## 📦 Installation

To get MenuApp up and running locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/joaobaptista03/MenuApp-NextJS.git
    cd menuapp
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Prepare your menu data:**

    The project is designed to fetch menu data from a `data` directory. Example menu data is already included in the repository to help you get started.

    The structure for your menu data should look like this:

    ```
    data/
    ├── [your-menu-id]/
    │   ├── [locale]/
    │   │   └── menu.json
    │   └── products/
    │       └── [product-id].png
    └── ...
    ```

    For example:

    ```
    data/
    ├── my-restaurant/
    │   ├── en/
    │   │   └── menu.json
    │   └── pt/
    │       └── menu.json
    └── another-cafe/
        └── en/
            └── menu.json
    ```

    The `menu.json` structure should adhere to the `IMenu`, `ICategory`, and `IProduct` interfaces defined in `data/models.ts`.

    Example `menu.json`:

    ```json
    {
      "name": "My Awesome Restaurant",
      "categories": [
        {
          "name": "Appetizers",
          "description": "Starters to whet your appetite.",
          "products": [
            {
              "id": "1",
              "name": "Spring Rolls",
              "description": "Crispy rolls with vegetables.",
              "price": 5.99
            }
          ]
        }
      ]
    }
    ```

    Product images should be placed in the `public/data/[your-menu-id]/products/` directory and named by their product ID (e.g., `public/data/my-restaurant/products/1.png`).

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Open your browser:**

    Navigate to `http://localhost:3000/[locale]/[id]`, replacing `[locale]` with a supported locale (e.g., `en`, `pt`) and `[id]` with your menu ID (e.g., `my-restaurant`).

    Example: `http://localhost:3000/en/my-restaurant`

---

## 💡 Usage

Once the application is running, you can:

* Browse different menu categories and products.
* Toggle between **light and dark themes** using the dedicated button.
* Change the language of the menu using the language dropdown, with options like English and Portuguese available by default.
* Observe the daily visit count update for the current menu.

---

## 🔮 Future Enhancements

* **Admin Panel**: Implement a backend for managing menus, categories, and products.
* **Order Integration**: Add functionality for customers to place orders directly from the menu.
* **Search Functionality**: Enable searching for specific products within the menu.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to contribute to the project, feel free to open an issue or submit a pull request.
