const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg"
const STORAGE_USER = "user"

const BASE_URL = "https://irileofdjkcmspvebnqq.supabase.co/auth/v1"

const endpoints = {
    login: `${BASE_URL}/token?grant_type=password`,
    register: `${BASE_URL}/signup`,
    contact: "todo"
}