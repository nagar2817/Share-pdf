# SharePDF

SharePDF is a simple web application that allows users to upload and share PDF files with others. It provides an easy way to store and distribute PDF documents securely. This repository contains the source code and documentation for the SharePDF project.

![SharePDF Screenshot](screenshot.png)

## Features

- **Upload PDF Files:** Users can upload their PDF files to the application securely.
- **Share Files:** Once uploaded, users can generate a unique URL for each file and share it with others.
- **Download Files:** Users can download the shared PDF files using the generated URLs.
- **Secure Storage:** The uploaded files are securely stored using Firebase Storage, ensuring data privacy.

## Technologies Used

- **Frontend:** React and Tailwind css with some uses of Toast library
- **Backend:** Node.js
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **Storage:** Firebase Storage

## Installation

To run SharePDF locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/nagar2817/share-pdf.git
```

2. Navigate to the project directory:

```bash
cd share-pdf
```

3. Install the dependencies:

```bash
npm install
```

4. Set up the Firebase configuration:
   
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com) if you haven't already.
   - Enable Firebase Authentication and Firestore in your project.
   - Obtain the Firebase configuration details (API keys, project ID, etc.) for your Firebase project.

5. Set up the environment variables:
   
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
   
     ```plaintext
     PORT=3000
     FIREBASE_API_KEY=<your_firebase_api_key>
     FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
     FIREBASE_PROJECT_ID=<your_firebase_project_id>
     FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
     ```
   
   - Replace `<your_firebase_api_key>`, `<your_firebase_auth_domain>`, `<your_firebase_project_id>`, and `<your_firebase_storage_bucket>` with your Firebase configuration details.

6. Start the application:

```bash
npm start
```

7. Open your browser and visit `http://localhost:3000` to access SharePDF.

## Usage

1. Open the SharePDF application in your web browser.
2. Click on the "Choose File" button to select a PDF file from your local machine.
3. Click on the "Upload" button to upload the selected file.
4. After the file is uploaded, you will be provided with a unique URL for sharing the file.
5. Copy the URL and share it with others.
6. To download a shared file, simply open the provided URL in a web browser and click on the "Download" button.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.

Before contributing, please make sure to read the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or need assistance, please feel free to reach out:

- Email: nagar.2@iitj.ac.in
- Twitter: [@0xRohit_](https://