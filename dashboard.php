<?php
require_once __DIR__ . '/auth.php';
$auth->requireLogin();
$currentUser = $auth->getCurrentUser();

if (!$currentUser) {
    header('Location: index.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SoUL Organization - Dashboard</title>
    <style>
        /* Include the same CSS variables from your login page */
        :root {
            --primary-color: #D91A60;
            --secondary-color: #E91E63;
            --accent-color: #FF6B9D;
            --bg-primary: #FEFBFC;
            --bg-secondary: #FDF7F9;
            --text-primary: #1A0D13;
            --text-secondary: #2D1B24;
            --card-bg: #FFFFFF;
            --border-color: #EFD6E3;
            --gradient-primary: linear-gradient(135deg, #E91E63 0%, #D91A60 50%, #C2185B 100%);
        }

        [data-theme="dark"] {
            --primary-color: #14B8A6;
            --secondary-color: #06B6D4;
            --accent-color: #22D3EE;
            --bg-primary: #0A1515;
            --bg-secondary: #0D2626;
            --text-primary: #F7FFFE;
            --text-secondary: #E6FFFA;
            --card-bg: #111827;
            --border-color: #374151;
            --gradient-primary: linear-gradient(135deg, #0891B2 0%, #14B8A6 50%, #10B981 100%);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', Arial, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            transition: all 0.3s ease;
            min-height: 100vh;
        }

        .dashboard-header {
            background: var(--card-bg);
            border-bottom: 1px solid var(--border-color);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .logo h1 {
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 1.5rem;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .theme-toggle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }

        .logout-btn {
            background: var(--gradient-primary);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .logout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .dashboard-main {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 2rem;
        }

        .welcome-card {
            background: var(--gradient-primary);
            color: white;
            padding: 2rem;
            border-radius: 16px;
            margin-bottom: 2rem;
            text-align: center;
        }

        .welcome-card h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
        }

        .stat-card .number {
            font-size: 2rem;
            font-weight: bold;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }

        .resources-section {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .resource-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .resource-card {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1rem;
            transition: all 0.3s ease;
        }

        .resource-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .resource-card h3 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }

        .btn {
            background: var(--gradient-primary);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 1rem;
        }

        @media (max-width: 768px) {
            .dashboard-header {
                padding: 1rem;
                flex-direction: column;
                gap: 1rem;
            }
            
            .dashboard-main {
                padding: 0 1rem;
            }
        }
    </style>
</head>
<body>
    <header class="dashboard-header">
        <div class="logo">
            <h1>SoUL Organization</h1>
            <p>Volunteer Dashboard</p>
        </div>
        <div class="user-info">
            <button class="theme-toggle" onclick="toggleTheme()">
                <span id="themeIcon">🌙</span>
            </button>
            <span>Welcome, <?= htmlspecialchars($currentUser['name']) ?>!</span>
            <a href="logout.php" class="logout-btn">Logout</a>
        </div>
    </header>

    <main class="dashboard-main">
        <div class="welcome-card">
            <h2>Welcome back, <?= htmlspecialchars($currentUser['name']) ?>! 👋</h2>
            <p>Ready to make a difference in education and empowerment?</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="number">125</div>
                <div>Students Helped</div>
            </div>
            <div class="stat-card">
                <div class="number">48</div>
                <div>Volunteer Hours</div>
            </div>
            <div class="stat-card">
                <div class="number">15</div>
                <div>Events Attended</div>
            </div>
            <div class="stat-card">
                <div class="number">92%</div>
                <div>Completion Rate</div>
            </div>
        </div>

        <section class="resources-section">
            <h2>📚 Alumni Resources & Documents</h2>
            <div class="resource-grid">
                <div class="resource-card">
                    <h3>📄 Volunteer Handbook 2024</h3>
                    <p>Complete guide for all SoUL volunteers with updated protocols and best practices.</p>
                    <button class="btn">Download PDF</button>
                </div>
                <div class="resource-card">
                    <h3>📊 Annual Impact Report</h3>
                    <p>See the incredible impact we've made together in transforming lives through education.</p>
                    <button class="btn">View Report</button>
                </div>
                <div class="resource-card">
                    <h3>🎓 Training Materials</h3>
                    <p>Enhance your volunteer skills with our comprehensive training modules.</p>
                    <button class="btn">Access Training</button>
                </div>
                <div class="resource-card">
                    <h3>📋 Event Guidelines</h3>
                    <p>Everything you need to know about organizing and participating in SoUL events.</p>
                    <button class="btn">View Guidelines</button>
                </div>
                <div class="resource-card">
                    <h3>🏆 Recognition Program</h3>
                    <p>Learn about our volunteer recognition system and track your achievements.</p>
                    <button class="btn">View Program</button>
                </div>
                <div class="resource-card">
                    <h3>👥 Community Forum</h3>
                    <p>Connect with fellow volunteers, share experiences, and collaborate on projects.</p>
                    <button class="btn">Join Forum</button>
                </div>
            </div>
        </section>

        <section class="resources-section">
            <h2>🎯 Recent Activities</h2>
            <div style="margin-top: 1rem;">
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <h4>Community Education Workshop</h4>
                    <p>March 15, 2024 - Conducted educational session for 25 students</p>
                </div>
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                    <h4>Mentorship Program Launch</h4>
                    <p>March 10, 2024 - Started mentoring 3 new students in mathematics</p>
                </div>
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px;">
                    <h4>Alumni Networking Event</h4>
                    <p>March 5, 2024 - Connected with 15 fellow alumni volunteers</p>
                </div>
            </div>
        </section>
    </main>

    <script>
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.getElementById('themeIcon');
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                body.setAttribute('data-theme', 'light');
                themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        }

        // Load saved theme
        window.addEventListener('load', function() {
            const savedTheme = localStorage.getItem('theme');
            const themeIcon = document.getElementById('themeIcon');
            
            if (savedTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                themeIcon.textContent = '☀️';
            } else {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.textContent = '🌙';
            }
        });
    </script>
</body>
</html>