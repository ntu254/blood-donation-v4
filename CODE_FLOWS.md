# Code Flow Overview

This project contains two main modules:

- `backendv4`: Spring Boot REST API
- `frontendv4`: React application

Below is a detailed walkthrough of how requests travel through the system and how different features interact.

## Backend (Spring Boot)

### 1. Authentication & Authorization
1. A client calls `/api/auth/login` with credentials.
2. `AuthController` delegates the request to `AuthService` which authenticates the user and issues a JWT.
3. The JWT is returned to the client and must be sent in the `Authorization` header for subsequent protected requests.
4. `SecurityConfig` defines public and protected routes. The `JwtAuthenticationFilter` extracts the token and sets the authentication context for each request.

### 2. User and Role Management
1. Admin endpoints under `/api/admin/users` are protected by the `ADMIN` role.
2. `AdminUserController` uses `UserService` to perform CRUD operations on `User` entities via the `UserRepository`.
3. Regular users can access their profile via `/api/users/me/profile` which is served by `UserController`.

### 3. Blood Types and Compatibility
1. `BloodTypeController` exposes endpoints to list blood types and retrieve users matching a specific type.
2. `BloodCompatibilityController` exposes compatibility rules. Responses are built using `BloodManagementService` which fetches entities from the database and converts them to DTOs.
3. Admins can create or modify rules using corresponding POST/PUT endpoints.

### 4. Blood Request & Donation Process
1. Members or staff create a blood request through `BloodRequestController`. Requests start in a pending state until verified by staff.
2. Once donors are identified, `DonationController` schedules donation appointments and tracks their status.
3. `AppointmentController` updates each step (health check, donation event, quality check) and ultimately stores a blood unit in the inventory when completed.

### 5. Inventory Management
1. `InventoryController` (not shown in detail) allows staff to list blood units, mark them as reserved, used or discarded, and view statistics.
2. Each unit references the blood type and donation process that created it.

### 6. Notification Flow
1. When important events occur (e.g., emergency request verified), the backend uses a NotificationService (placeholder) to push notifications to relevant users.
2. Users retrieve their notifications via `/api/notifications`.

## Frontend (React)

### 1. Routing & Layout
1. Routes are declared in `src/routes/AppRoutes.jsx` and wrapped with either `PublicRoute` or `PrivateRoute` to check authentication.
2. `MainLayout` provides the overall page chrome (navbar, footer). Admin pages use `AdminLayout`.

### 2. Authentication Flow
1. `AuthContext` manages the logged-in user and exposes `login`, `logout` and `register` functions.
2. `authService` performs API calls and stores the JWT token in `localStorage`.
3. `apiClient` is an axios instance that attaches the token to requests and handles errors globally.

### 3. Member Pages
1. **Profile** – `UserProfilePage` fetches and updates the logged-in user profile via `userService`.
2. **Find Donor** – `FindDonorPage` posts the user’s location to `/users/search/donors-by-location` and lists matching donors.
3. **Blood Requests** – Members can create and track their requests via forms connected to `bloodRequestService`.

### 4. Admin & Staff Pages
1. Admin dashboards under `/admin` allow management of users, blood inventory, donation events and blog content.
2. Each page calls the corresponding service (e.g., `appointmentService`, `donationService`) which wraps API calls.

### 5. Notification UI
1. Components subscribe to a global notification context and show toasts via `react-hot-toast` whenever operations succeed or fail.

---
This document gives an overview of how front‑end actions correspond to back‑end endpoints and how data travels between them. Individual controllers and services contain additional validation and business logic not covered here.
