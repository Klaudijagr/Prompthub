-- Seed data for PromptHub MVP

-- Insert sample users
INSERT INTO users (id, email, name) VALUES
('user1', 'john@example.com', 'John Doe'),
('user2', 'jane@example.com', 'Jane Smith'),
('user3', 'mike@example.com', 'Mike Johnson'),
('author1', 'author1@example.com', 'AI Marketing Pro'),
('author2', 'author2@example.com', 'DevTools Master'),
('author3', 'author3@example.com', 'Story Craft');

-- Insert sample subscriptions
INSERT INTO subscriptions (id, user_id, stripe_subscription_id, status, plan_name, amount, current_period_start, current_period_end) VALUES
('sub1', 'user1', 'sub_1234567890', 'active', 'Pro', 29.99, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH)),
('sub2', 'user2', 'sub_0987654321', 'active', 'Basic', 9.99, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH));

-- Insert sample prompts
INSERT INTO prompts (id, title, description, content, performance_cost, author_id, price, tags, is_verified) VALUES
('prompt1', 
 'Content Marketing Assistant',
 'Generate engaging blog posts, social media content, and marketing copy that converts. This prompt has been optimized for maximum engagement and conversion rates.',
 'You are an expert content marketing assistant. Create compelling {content_type} about {topic} for {target_audience}. Focus on {key_objectives} and maintain a {tone} tone. Include relevant hashtags and call-to-action where appropriate.',
 85,
 'author1',
 2.99,
 '["Marketing", "Content", "Social Media", "Copywriting"]',
 TRUE),

('prompt2',
 'Code Review Expert', 
 'Analyze code quality, suggest improvements, and identify potential bugs with detailed explanations and best practices.',
 'You are a senior software engineer conducting a thorough code review. Analyze the following {language} code for: 1) Code quality and readability, 2) Performance optimizations, 3) Security vulnerabilities, 4) Best practices adherence. Provide specific suggestions with examples.',
 92,
 'author2', 
 3.99,
 '["Programming", "Code Review", "Software Engineering", "Quality Assurance"]',
 TRUE),

('prompt3',
 'Creative Writing Coach',
 'Help with storytelling, character development, and plot structure for novels, short stories, and screenplays.',
 'You are an experienced creative writing coach. Help improve the following {writing_type} by focusing on: {focus_areas}. Provide constructive feedback on character development, plot structure, dialogue, and narrative flow. Suggest specific improvements with examples.',
 88,
 'author3',
 1.99,
 '["Creative Writing", "Storytelling", "Fiction", "Character Development"]',
 TRUE),

('prompt4',
 'Business Strategy Advisor',
 'Develop comprehensive business strategies, market analysis, and growth plans for startups and established companies.',
 'You are a senior business strategy consultant. Analyze the {business_context} and provide strategic recommendations for {objectives}. Include market analysis, competitive positioning, risk assessment, and actionable next steps.',
 90,
 'author1',
 4.99,
 '["Business", "Strategy", "Consulting", "Market Analysis"]',
 TRUE),

('prompt5',
 'Technical Documentation Writer',
 'Create clear, comprehensive technical documentation, API guides, and user manuals that are easy to understand.',
 'You are a technical writing expert. Create comprehensive documentation for {technical_subject}. Structure the content with clear headings, step-by-step instructions, code examples where relevant, and troubleshooting sections. Target audience: {audience_level}.',
 87,
 'author2',
 2.49,
 '["Technical Writing", "Documentation", "API", "User Guides"]',
 TRUE);

-- Insert sample test calls
INSERT INTO test_calls (id, prompt_id, user_id, input_text, output_text, provider, success) VALUES
('test1', 'prompt1', 'user1', 'Blog post about sustainable fashion for millennials', '🌱 The Future of Fashion is Green: Why Millennials Are Leading the Sustainable Style Revolution...', 'openai', TRUE),
('test2', 'prompt2', 'user2', 'Python function for data validation', 'Code Review Analysis:\n\n1. Code Quality: The function structure is good but could benefit from type hints...', 'openai', TRUE),
('test3', 'prompt3', 'user1', 'Fantasy novel character development', 'Character Development Feedback:\n\nYour protagonist shows promise but needs deeper motivation...', 'cohere', TRUE);

-- Insert sample purchases
INSERT INTO purchases (id, user_id, prompt_id, stripe_payment_intent_id, amount, status) VALUES
('purchase1', 'user1', 'prompt1', 'pi_1234567890', 2.99, 'succeeded'),
('purchase2', 'user1', 'prompt2', 'pi_0987654321', 3.99, 'succeeded'),
('purchase3', 'user2', 'prompt3', 'pi_1122334455', 1.99, 'succeeded');

-- Insert sample reviews
INSERT INTO reviews (id, user_id, prompt_id, rating, comment) VALUES
('review1', 'user1', 'prompt1', 5, 'Excellent prompt! Generated amazing content for my marketing campaigns.'),
('review2', 'user2', 'prompt2', 5, 'Very thorough code reviews. Helped me improve my coding standards significantly.'),
('review3', 'user1', 'prompt3', 4, 'Great for creative writing. Could use more specific genre guidance.');

-- Insert sample usage tracking
INSERT INTO usage_tracking (id, user_id, action_type, resource_id, cost) VALUES
('usage1', 'user1', 'test_call', 'prompt1', 0.01),
('usage2', 'user1', 'prompt_use', 'prompt1', 0.05),
('usage3', 'user2', 'test_call', 'prompt2', 0.01),
('usage4', 'user2', 'prompt_use', 'prompt3', 0.03);
