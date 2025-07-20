Technorix Job Portal
This project is a React-based frontend application for a job portal, designed to display job openings, allow users to view job details, and provide options for filtering, searching, and applying to jobs. It interacts with an external API to fetch job data.

Table of Contents
Features

Technologies Used

Project Structure

Known Issues

How to Run Locally

Features
Browse Job Openings: View a list of available job positions, categorized by department.

Job Search & Filtering:

Search for jobs by keywords.

Filter jobs by Department, Location, and Function.

Display active filters as removable chips.

Job Details Page:

View comprehensive details for a specific job opening, including title, department, location, type, experience, and a full description.

"Apply Now" button to direct users to the external application URL.

"Back to Job Openings" navigation.

Social sharing options for Facebook, LinkedIn, and Twitter to share job listings.

Responsive Design: The layout adapts to various screen sizes for an optimal viewing experience.

Loading & Error States: Provides clear feedback to the user during data fetching and in case of errors.

Component-Based Architecture: Built with reusable React components for maintainability and scalability.

Technologies Used
React: A JavaScript library for building user interfaces.

Material-UI (MUI): A comprehensive suite of React components that implements Google's Material Design.

React Router DOM: For declarative routing within the application.

Custom API Integration: Fetches job data from an external API (e.g., Jobsoid API).

Project Structure
The project follows a standard React application structure:

job-portal-frontend/
├── node_modules/
├── public/
├── src/
│ ├── components/
│ │ ├── common/ # Reusable UI components (e.g., Loader, ErrorMessage, JobCard)
│ │ │ ├── Loader.js
│ │ │ ├── ErrorMessage.js
│ │ │ └── JobCard.js
│ │ └── filters/ # Components related to job filtering
│ │ └── JobFilter.js
│ ├── pages/ # Page-level components (e.g., JobsPage, JobDetailsPage)
│ │ ├── JobsPage.js
│ │ └── JobDetailsPage.js
│ ├── utils/ # Utility functions (e.g., API calls)
│ │ └── api.js
│ ├── App.css
│ ├── App.js
│ └── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

Known Issues
During development, it was observed that the Jobsoid API's filtering capability (specifically for location and department filters) was not functioning as expected based on the documentation. This means that while the frontend sends the correct filter parameters, the API might not return filtered results accurately, or it may require a different approach to filtering directly on the API side.

How to Run Locally
Follow these steps to set up and run the project on your local machine:

Clone the repository:

git clone https://github.com/Prathamesh-Pawaskar/teknorix-job-portal.git

cd job-openings-portal

Install dependencies:

npm install

Start the development server:

npm start

The application will open in your browser at http://localhost:3000.
