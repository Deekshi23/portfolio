# Portfolio Backend API Contracts

## Overview
This document outlines the API contracts and integration plan for the MERN Stack Portfolio backend implementation.

## Current Frontend Implementation
- **Mock Data**: Located in `/app/frontend/src/data/mockData.js`
- **Contact Form**: Frontend component in `/app/frontend/src/components/Contact.js` 
- **Current Behavior**: Shows success toast but doesn't actually store/send data

## Backend APIs to Implement

### 1. Contact Form Submission API
**Endpoint**: `POST /api/contact/message`

**Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

**Response Success (201)**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "message_id",
    "timestamp": "2025-01-27T10:30:00Z"
  }
}
```

**Response Error (400)**:
```json
{
  "success": false,
  "message": "Validation error message",
  "errors": ["field validation errors"]
}
```

### 2. Get All Messages API (Admin/Portfolio Owner)
**Endpoint**: `GET /api/contact/messages`

**Response Success (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "message_id",
      "name": "sender_name",
      "email": "sender_email",
      "subject": "message_subject",
      "message": "message_content",
      "timestamp": "2025-01-27T10:30:00Z",
      "isRead": false
    }
  ],
  "total": 5
}
```

## MongoDB Models

### ContactMessage Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  timestamp: Date (default: Date.now),
  isRead: Boolean (default: false),
  ipAddress: String (optional),
  userAgent: String (optional)
}
```

## Frontend Integration Changes Required

### 1. Contact Form Component (`/app/frontend/src/components/Contact.js`)
- **Remove**: Mock delay in form submission
- **Add**: Actual API call to `${BACKEND_URL}/api/contact/message`
- **Update**: Error handling for different response types
- **Keep**: Success toast and form reset functionality

### 2. API Integration
- **Method**: POST request using axios
- **Headers**: Content-Type: application/json
- **Error Handling**: Display specific error messages from backend
- **Loading State**: Show loading spinner during submission

## Implementation Plan

### Phase 1: Backend Models & APIs
1. Create ContactMessage MongoDB model
2. Implement POST /api/contact/message endpoint
3. Implement GET /api/contact/messages endpoint (for future admin panel)
4. Add proper validation and error handling

### Phase 2: Frontend Integration
1. Update Contact.js component to use real API
2. Replace mock submission with actual HTTP request
3. Handle different error scenarios
4. Test form submission and data persistence

### Phase 3: Testing & Validation
1. Test backend APIs with different inputs
2. Test frontend form submission
3. Verify data is stored correctly in MongoDB
4. Test error scenarios and validation

## Environment Variables Required
- `MONGO_URL`: Already configured
- `DB_NAME`: Already configured
- No additional environment variables needed for basic functionality

## Security Considerations
- Input validation and sanitization
- Rate limiting for form submissions (future enhancement)
- Email validation
- Basic SQL injection prevention (using Mongoose)

## Future Enhancements (Optional)
- Email notifications to portfolio owner
- Admin panel to view/manage messages
- Message read status tracking
- Reply functionality