 Base URL
Local: http://localhost:3152/api

📚 Endpoints Overview
- Auth: /auth/login, /auth/register
- Employees: /employees/create, /employees/get, /employees/:id
- Departments: /departments/create, /departments/get, /departments/:id
- Attendance: /attendance, /attendance/:id
- Leave: /leave, /leave/:id
- Payroll: /payroll, /payroll/:id
- Performance: /performance, /performance/:id

🔐 Authentication
Use JWT in headers:
Authorization: Bearer <your_jwt_token>



👥 Role Access
- Admin/Manager: Full access
- User: Limited by role
- Rate Limiting: Applied to login & sensitive routes
