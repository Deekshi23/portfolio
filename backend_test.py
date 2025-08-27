#!/usr/bin/env python3
"""
Backend API Testing Suite for Portfolio Contact Form
Tests all contact form API endpoints and validation scenarios
"""

import requests
import json
import time
import os
from datetime import datetime
from typing import Dict, Any

# Get backend URL from environment
BACKEND_URL = "https://webdev-folio-18.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class ContactFormAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Portfolio-Backend-Tester/1.0'
        })
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, details: str, response_data: Dict = None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if response_data and not success:
            print(f"   Response: {json.dumps(response_data, indent=2)}")
    
    def test_health_check(self):
        """Test GET /api/health endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'healthy':
                    self.log_test(
                        "Health Check", 
                        True, 
                        f"Server is healthy (status: {data.get('status')})",
                        data
                    )
                    return True
                else:
                    self.log_test(
                        "Health Check", 
                        False, 
                        f"Unexpected health status: {data.get('status')}",
                        data
                    )
                    return False
            else:
                self.log_test(
                    "Health Check", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "text": response.text}
                )
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def test_valid_contact_submission(self):
        """Test valid contact form submission"""
        valid_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "Hello! I'm interested in discussing a potential project collaboration. Your portfolio showcases impressive work and I'd love to connect."
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/contact/message", 
                json=valid_data,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('data', {}).get('id'):
                    self.log_test(
                        "Valid Contact Submission", 
                        True, 
                        f"Message submitted successfully with ID: {data['data']['id']}",
                        data
                    )
                    return data['data']['id']  # Return message ID for later tests
                else:
                    self.log_test(
                        "Valid Contact Submission", 
                        False, 
                        f"Success flag false or missing ID: {data}",
                        data
                    )
                    return None
            else:
                self.log_test(
                    "Valid Contact Submission", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "text": response.text}
                )
                return None
                
        except Exception as e:
            self.log_test("Valid Contact Submission", False, f"Request error: {str(e)}")
            return None
    
    def test_invalid_email_format(self):
        """Test submission with invalid email format"""
        invalid_email_data = {
            "name": "Test User",
            "email": "invalid-email-format",  # Missing @ symbol
            "subject": "Test Subject",
            "message": "This is a test message with invalid email format."
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/contact/message", 
                json=invalid_email_data,
                timeout=10
            )
            
            if response.status_code in [400, 422]:  # Accept both 400 and 422 for validation errors
                data = response.json()
                if 'detail' in data and ('email' in str(data).lower() or 'validation' in str(data).lower() or 'value_error' in str(data).lower()):
                    self.log_test(
                        "Invalid Email Format", 
                        True, 
                        f"Correctly rejected invalid email format with {response.status_code} error",
                        data
                    )
                    return True
                else:
                    self.log_test(
                        "Invalid Email Format", 
                        False, 
                        f"{response.status_code} error but unexpected message: {data}",
                        data
                    )
                    return False
            else:
                self.log_test(
                    "Invalid Email Format", 
                    False, 
                    f"Expected 400/422 but got HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "text": response.text}
                )
                return False
                
        except Exception as e:
            self.log_test("Invalid Email Format", False, f"Request error: {str(e)}")
            return False
    
    def test_empty_required_fields(self):
        """Test submission with empty required fields"""
        empty_fields_data = {
            "name": "",  # Empty name
            "email": "test@example.com",
            "subject": "",  # Empty subject
            "message": "This message has empty required fields."
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/contact/message", 
                json=empty_fields_data,
                timeout=10
            )
            
            if response.status_code in [400, 422]:  # Accept both 400 and 422 for validation errors
                data = response.json()
                self.log_test(
                    "Empty Required Fields", 
                    True, 
                    f"Correctly rejected empty required fields with {response.status_code} error",
                    data
                )
                return True
            else:
                self.log_test(
                    "Empty Required Fields", 
                    False, 
                    f"Expected 400/422 but got HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "text": response.text}
                )
                return False
                
        except Exception as e:
            self.log_test("Empty Required Fields", False, f"Request error: {str(e)}")
            return False
    
    def test_missing_required_fields(self):
        """Test submission with missing required fields"""
        missing_fields_data = {
            "name": "Test User",
            # Missing email, subject, and message
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/contact/message", 
                json=missing_fields_data,
                timeout=10
            )
            
            if response.status_code == 422 or response.status_code == 400:
                data = response.json()
                self.log_test(
                    "Missing Required Fields", 
                    True, 
                    f"Correctly rejected missing fields with {response.status_code} error",
                    data
                )
                return True
            else:
                self.log_test(
                    "Missing Required Fields", 
                    False, 
                    f"Expected 400/422 but got HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "text": response.text}
                )
                return False
                
        except Exception as e:
            self.log_test("Missing Required Fields", False, f"Request error: {str(e)}")
            return False
    
    def test_very_long_message(self):
        """Test submission with very long message (over 5000 characters)"""
        long_message = "A" * 5001  # 5001 characters, exceeding the 5000 limit
        
        long_message_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Long Message Test",
            "message": long_message
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/contact/message", 
                json=long_message_data,
                timeout=10
            )
            
            if response.status_code == 400 or response.status_code == 422:
                data = response.json()
                self.log_test(
                    "Very Long Message", 
                    True, 
                    f"Correctly rejected message over 5000 chars with {response.status_code} error",
                    data
                )
                return True
            else:
                self.log_test(
                    "Very Long Message", 
                    False, 
                    f"Expected 400/422 but got HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "text": response.text}
                )
                return False
                
        except Exception as e:
            self.log_test("Very Long Message", False, f"Request error: {str(e)}")
            return False
    
    def test_message_retrieval(self):
        """Test GET /api/contact/messages endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/contact/messages", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'data' in data:
                    message_count = len(data['data'])
                    total_count = data.get('total', 0)
                    self.log_test(
                        "Message Retrieval", 
                        True, 
                        f"Successfully retrieved {message_count} messages (total: {total_count})",
                        {"message_count": message_count, "total": total_count}
                    )
                    return data['data']
                else:
                    self.log_test(
                        "Message Retrieval", 
                        False, 
                        f"Success flag false or missing data: {data}",
                        data
                    )
                    return None
            else:
                self.log_test(
                    "Message Retrieval", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "text": response.text}
                )
                return None
                
        except Exception as e:
            self.log_test("Message Retrieval", False, f"Request error: {str(e)}")
            return None
    
    def test_database_integration(self, submitted_message_id: str = None):
        """Test that messages are properly stored and retrievable"""
        if not submitted_message_id:
            self.log_test(
                "Database Integration", 
                False, 
                "No message ID available from previous submission test"
            )
            return False
        
        # Retrieve messages and check if our submitted message exists
        messages = self.test_message_retrieval()
        if messages is None:
            self.log_test(
                "Database Integration", 
                False, 
                "Could not retrieve messages to verify database storage"
            )
            return False
        
        # Look for our submitted message
        found_message = None
        for msg in messages:
            if msg.get('id') == submitted_message_id:
                found_message = msg
                break
        
        if found_message:
            # Verify message structure
            required_fields = ['id', 'name', 'email', 'subject', 'message', 'timestamp']
            missing_fields = [field for field in required_fields if field not in found_message]
            
            if not missing_fields:
                self.log_test(
                    "Database Integration", 
                    True, 
                    f"Message properly stored and retrieved with all required fields",
                    {"message_id": submitted_message_id, "fields": list(found_message.keys())}
                )
                return True
            else:
                self.log_test(
                    "Database Integration", 
                    False, 
                    f"Message found but missing fields: {missing_fields}",
                    {"message": found_message}
                )
                return False
        else:
            self.log_test(
                "Database Integration", 
                False, 
                f"Submitted message with ID {submitted_message_id} not found in retrieved messages"
            )
            return False
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 60)
        print("PORTFOLIO BACKEND API TESTING SUITE")
        print("=" * 60)
        print(f"Testing backend at: {API_BASE}")
        print(f"Started at: {datetime.now().isoformat()}")
        print("-" * 60)
        
        # Test 1: Health Check
        health_ok = self.test_health_check()
        
        if not health_ok:
            print("\n❌ CRITICAL: Health check failed. Stopping tests.")
            return self.generate_summary()
        
        # Test 2: Valid Contact Submission
        submitted_message_id = self.test_valid_contact_submission()
        
        # Test 3: Invalid Email Format
        self.test_invalid_email_format()
        
        # Test 4: Empty Required Fields
        self.test_empty_required_fields()
        
        # Test 5: Missing Required Fields
        self.test_missing_required_fields()
        
        # Test 6: Very Long Message
        self.test_very_long_message()
        
        # Test 7: Message Retrieval
        self.test_message_retrieval()
        
        # Test 8: Database Integration
        if submitted_message_id:
            self.test_database_integration(submitted_message_id)
        
        return self.generate_summary()
    
    def generate_summary(self):
        """Generate test summary"""
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests*100):.1f}%" if total_tests > 0 else "0%")
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  ❌ {result['test']}: {result['details']}")
        
        print(f"\nCompleted at: {datetime.now().isoformat()}")
        print("=" * 60)
        
        return {
            'total': total_tests,
            'passed': passed_tests,
            'failed': failed_tests,
            'success_rate': (passed_tests/total_tests*100) if total_tests > 0 else 0,
            'results': self.test_results
        }

def main():
    """Main test execution"""
    tester = ContactFormAPITester()
    summary = tester.run_all_tests()
    
    # Return exit code based on test results
    return 0 if summary['failed'] == 0 else 1

if __name__ == "__main__":
    exit(main())