# Hospital Management & Appointment Booking System

A full-stack web application to simplify hospital appointment booking and administrative tasks. Patients can register, search doctors, and book appointments. Admins can manage users, doctors, and view filtered reports on appointments.

---

## 📌 Project Overview

This system is designed to provide a smooth and secure appointment booking experience for patients while offering efficient administrative control for hospital staff. The application includes role-based access for patients and admins, ensuring each user interacts only with relevant features.

---

## 🎯 Core Features

### 👤 Patient Features

- **User Registration & Login**
  - Fields: Name, email, age, gender, address, contact number, password
- **Doctor Directory**
  - View doctor profiles with name, image, department, experience, and qualifications
- **Appointment Booking**
  - Book by selecting department, doctor, and preferred date
- **My Appointments**
  - View upcoming and past appointments
- **Profile Management**
  - Update contact details and address

### 🛠️ Admin Features

- **Admin Login**
- **Appointment Management**
  - View today’s appointments
  - Filter by date or doctor
- **Doctor Management**
  - Create, view, edit, and delete doctor profiles
- **User Management**
  - View user list and individual profiles with appointment history
- **Reports**
  - "Most Viewed Doctor" monthly report sorted by number of patient visits

---

## 🧰 Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | React.js           |
| Backend    | Django (Python)    |
| Database   | MySQL (via XAMPP)  |
| Interface  | HTML, CSS, Bootstrap 5|
| Tools      | phpMyAdmin, Postman         |
| APIs       | REST APIs (Django Rest Framework) |

---

## 🧾 Project Scope

### ✅ In Scope

- Patient and admin authentication  
- Responsive design for patients and admins  
- Basic reports and filtering  
- Doctor and appointment management

### ❌ Out of Scope

- Payment integration  
- Advanced analytics or dashboards  

---
## Project Structure

```plaintext
hospital-management-system/
├── backend/                # Django backend
│   ├── manage.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   ├── app1/               # your Django apps
│   └── ...
├── frontend/               # React frontend
│   ├── src/                # React source code
│   ├── public/             # Public static files
│   ├── package.json
│   └── ...
├── README.md               # Project documentation
