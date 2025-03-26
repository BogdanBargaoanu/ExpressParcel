<div align="center" class="text-center">
<img src="https://raw.githubusercontent.com/BogdanBargaoanu/delivery/refs/heads/main/admin-app/src/components/Assets/logo.png" style="width: 100px;" /><h1>ExpressParcel</h1>
<p><em>Delivering packages, empowering connections, enhancing experiences.</em></p>

<img alt="last-commit" src="https://img.shields.io/github/last-commit/BogdanBargaoanu/ExpressParcel?style=flat&amp;logo=git&amp;logoColor=white&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-top-language" src="https://img.shields.io/github/languages/top/BogdanBargaoanu/ExpressParcel?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="repo-language-count" src="https://img.shields.io/github/languages/count/BogdanBargaoanu/ExpressParcel?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;">
<p><em>Built with the tools and technologies:</em></p>
<img alt="JSON" src="https://img.shields.io/badge/JSON-000000.svg?style=flat&amp;logo=JSON&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Spring" src="https://img.shields.io/badge/Spring-000000.svg?style=flat&amp;logo=Spring&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="npm" src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&amp;logo=npm&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&amp;logo=JavaScript&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="React%20Bootstrap" src="https://img.shields.io/badge/React%20Bootstrap-41E0FD.svg?style=flat&amp;logo=React-Bootstrap&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&amp;logo=React&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<br>
<img alt="XML" src="https://img.shields.io/badge/XML-005FAD.svg?style=flat&amp;logo=XML&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&amp;logo=Axios&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style=flat&amp;logo=Bootstrap&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="CSS" src="https://img.shields.io/badge/CSS-663399.svg?style=flat&amp;logo=CSS&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="React%20Table" src="https://img.shields.io/badge/React%20Table-FF4154.svg?style=flat&amp;logo=React-Table&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<br>
<br>

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)
<br>
<br>

ExpressParcel is a delivery management system designed to streamline package tracking and courier operations. The application consists of a **Spring Boot API** with a **MySQL database**, and two frontend applications built with **React.js** and **Bootstrap**.
</div>
<br>
<br>


## Features

### Backend (Spring Boot API)
- Implements **Controller-Service-Repository** architecture.
- Manages couriers and packages with CRUD operations.
- Uses **SMTP** to send automatic confirmation emails upon package delivery.
- Connects to a **MySQL database** for persistent storage.

### Admin Application (Courier App)
- **Authentication**: Couriers can register and log in.
- **Manage Couriers**: Add, update, or remove couriers.
- **Manage Packages**: Create, update, delete, and assign packages to couriers.
- **Delivery System**: Deliver packages and send email confirmations to recipients.
- **Manager Updates**: Update the manager assigned to a courier.

### Client Application (Client App)
- **Track Packages**: Search packages by **AWB (Air Waybill)**.
- **Manager Insights**: View data on managers, including the number of packages delivered.
- **Find Couriers**: Check available couriers with no pending packages and contact them.

## Getting Started

### Prerequisites
- Java 17+
- Node.js & npm
- MySQL database

### Installation

#### Backend (Spring Boot API)
1. Clone the repository:
   ```sh
   git clone https://github.com/BogdanBargaoanu/delivery.git
   cd delivery
   ```
2. Configure your `application.properties`:
   ```properties
   spring.datasource.url = jdbc:mysql://localhost:3306/packagetracking?createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. Configure the `SMTP` settings in the `MailConfig` class:
   ```java
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("yoursmtphost");
        mailSender.setPort(587);
        mailSender.setUsername("youremail@domain.com");
        mailSender.setPassword("yourpassword");
   ```
4. Run the application:
   ```sh
   mvn spring-boot:run
   ```

#### Frontend (React Apps)
1. Install dependencies for each frontend application:
   ```sh
   cd admin-app
   npm install #or npm install --legacy-peer-deps
   npm start
   ```
   ```sh
   cd client-app
   npm install #or npm install --legacy-peer-deps
   npm start
   ```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|------------|
| `POST` | `/couriers/login` | Login as a courier |
| `PUT` | `/packages/deliver/{id}` | Mark a package as delivered & send email |
| `GET` | `/packages/find?awb={awb}` | Track package by AWB |
| `GET` | `/couriers/delivered-by-managers` | Get the list of managers and delivered packages |
| `PUT` | `/couriers?courierId={courierId}&managerId={managerId}` | Set a manager for a courier |
> For a more extensive use of the API, check the full endpoint config in the code.

## Diagrams

![Acc:](https://raw.githubusercontent.com/BogdanBargaoanu/delivery/d944e451da68b550be9d2018b0eddbb3f234e7b9/documentation/ExpressParcel_SequenceDiagram_Track_By_AWB.svg)
> For more diagrams and documentation, check the [documentation](https://github.com/BogdanBargaoanu/delivery/tree/main/documentation) folder of the repository.
## Contribution
Feel free to contribute by opening an issue or submitting a pull request.

---
