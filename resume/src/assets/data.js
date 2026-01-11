export const resumeData = {
    name: "Mitesh Goyal",
    title: "Full-Stack MERN Developer",
    email: "miteshhgoyal@gmail.com",
    phone: "7889203083",
    location: "Budhlada, Punjab, India",
    portfolioLink: "https://cv.miteshh.in",
    portfolioLabel: "Portfolio",
    introduction: "Results-driven Full-Stack Developer specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js). Proven expertise delivering scalable SaaS platforms, fintech solutions, IPTV systems, and enterprise applications. Excels in complete project lifecycle management from requirements analysis to production deployment and ongoing maintenance.",

    experience: [
        {
            role: "Solo Freelance Developer",
            company: "Self-Employed",
            dates: "April 2025 - Present",
            responsibilities: [
                "Engineered 10+ production-ready MERN stack applications for fintech, IPTV, healthcare, MLM, and e-commerce clients",
                "Orchestrated end-to-end project delivery including architecture design, development, server configuration, and performance optimization",
                "Deployed scalable solutions on VPS infrastructure with Nginx, PM2, custom domains, and SSL certificates",
                "Integrated secure payment gateways, real-time APIs, and role-based authentication systems for mission-critical applications"
            ]
        }
    ],

    projects: [
        {
            name: "Nupips - GTC Forex Team Partner Platform",
            tech: "React.js, Express.js, Tailwind CSS, Node.js, MongoDB",
            description: "Architected a comprehensive partner platform integrating GTC FX broker services. Enables users to purchase trading products, access educational courses, participate in live competitions, and manage cryptocurrency deposits/withdrawals seamlessly.",
            businessChallenge: "GTC Forex partners needed an end-to-end platform to manage multiple revenue streams and automate business operations.",
            clientObjective: "Establish lead generation pipeline and maximize commission revenue from trader fees through an integrated platform.",
            link: "https://user.nupips.com/register",
            entities: ['Landing Website', 'User Web Portal', 'Admin Web Portal', 'Express API']
        },
        {
            name: "The Gearmates",
            tech: "React.js, Express.js, Tailwind CSS, Node.js, MongoDB",
            description: "Built a full-featured e-commerce platform specializing in mobile accessories. Implemented user authentication, product catalog management, shopping cart, and order processing with secure payment integration.",
            businessChallenge: "Client needed scalable online presence to expand mobile accessories business beyond physical retail.",
            clientObjective: "Launch direct-to-consumer e-commerce platform to increase market reach and automate sales operations.",
            link: "https://thegearmates.com",
            entities: ['Landing Website', 'User Web Portal', 'Admin Web Portal', 'Express API']
        },
        {
            name: "Digital Cable Network - IPTV Management Panel",
            tech: "React.js, Express.js, MongoDB, Tailwind CSS",
            description: "Developed comprehensive admin dashboard for channel, playlist, and subscriber lifecycle management. Designed secure RESTful APIs supporting TV applications and web clients. Deployed production-ready solution with VPS, Nginx reverse proxy, and SSL configuration.",
            businessChallenge: "Manual channel and subscriber management created operational bottlenecks and limited scalability.",
            clientObjective: "Streamline IPTV operations with comprehensive admin controls and secure API access for multi-platform distribution.",
            link: "https://onlineiptvhub.com",
            entities: ['Admin Web Portal', 'Android Mobile App', 'Android TV App', 'Express API']
        },
        {
            name: "Multi-Company Management CRM",
            tech: "React.js, Express.js, MongoDB, Tailwind CSS",
            description: "Implemented comprehensive CRM modules for inventory tracking, financial ledgers, and payroll automation. Architected multi-tier role-based access control (Super Admin, Admin, Sub-Admin). Delivered advanced reporting suite spanning production, sales, and cash flow analytics.",
            businessChallenge: "Multiple factories operated with disparate systems, lacking unified visibility across inventory, finances, and employee management.",
            clientObjective: "Centralize operations for Delhi-based multi-business enterprise through integrated CRM system.",
            link: "https://multi-factories-management-system.vercel.app/",
            entities: ['Admin Web Portal', 'Express API']
        },
        {
            name: "TezMaths",
            tech: "React Native, Tailwind CSS, Expo, Firebase",
            description: "Developed a gamified competitive exam preparation app focused on rapid mathematics calculation for SSC, banking, and government exams. Features include timed quizzes, player-vs-player battles, detailed performance analytics, and adaptive difficulty progression. Built for Viral Maths by Navneet Tiwari Sir, a popular YouTube mathematics educator, to expand their digital learning ecosystem.",
            businessChallenge: "Students preparing for competitive exams needed an engaging platform to practice fast mathematics calculations while tracking performance and competing with peers.",
            clientObjective: "Design a mobile-first learning platform that combines exam preparation with competitive elements to enhance learning engagement and retention.",
            link: "https://play.google.com/store/apps/details?id=com.tezmathsteam.tezmaths",
            entities: ['Mobile App', 'Admin Web Portal']
        },
        {
            name: "POS App",
            tech: "React Native, Tailwind CSS, Expo, MongoDB, Express.js",
            description: "Developed a simple yet powerful mobile app for managing personal or small business lending activities. The app enables users to record outstanding loan amounts, schedule and collect EMIs, and maintain detailed transaction histories for each borrower. Integrated secure synchronization between client and server to ensure reliable data storage.",
            businessChallenge: "Tracking lent amounts and collection cycles manually led to inconsistencies and record loss.",
            clientObjective: "Digitize the loan and EMI tracking process with an intuitive mobile application offering accessible financial records and repayment insights.",
            link: "https://drive.google.com/file/d/1A_59wW4AWVHp7YF_7ywUdVSA98DmI5wA/view?usp=drive_link",
            entities: ['Mobile App', 'Express API']
        },
        {
            name: "Movie Purchasing App",
            tech: "React Native, React.js, Tailwind CSS, Expo, MongoDB, Express.js",
            description: "Designed a hybrid movie rental and streaming system allowing admins to upload movies and manage pricing from a web portal. Customers can securely purchase individual movies and gain time-limited access (movie duration + 30 minutes). The system enforces timed digital rights access, ensuring controlled playback through integrated backend logic.",
            businessChallenge: "Independent content providers required a flexible digital distribution system to monetize content securely without full-scale OTT infrastructure.",
            clientObjective: "Launch a pay-per-view movie platform enabling direct monetization for creators and seamless viewing experience for customers.",
            link: "https://drive.google.com/file/d/1hP7LXXRs6gTlb6fSnjAiDl0cIaRWr-2p/view?usp=drive_link",
            entities: ['Mobile App', 'Admin Web Portal', 'Express API']
        },
        {
            name: "HomeStock",
            tech: "React.js, Tailwind CSS, Python FastAPI, Electron",
            description: "Engineered a desktop application for automation of Indian stock market data processing. The system downloads NSE Bhavcopy data, processes raw files, and generates comprehensive Excel workbooks containing company-wise structured reports. Designed cross-platform builds for both Windows (.exe) and Mac (.dmg) distributions.",
            businessChallenge: "Daily NSE data processing and company-wise report generation were time-consuming using manual spreadsheets.",
            clientObjective: "Automate stock data collection and processing workflows with an efficient desktop tool to accelerate research and reduce data handling errors.",
            link: "https://drive.google.com/drive/folders/1LCYjCBbSsMTIMoCDDdfuekMryxn7x9AT?usp=drive_link",
            entities: ['Desktop App (.exe)', 'Mac App (.dmg)']
        }
    ],

    education: [
        {
            degree: "Bachelor of Vocation in Software Development",
            institution: "Guru Nanak College, Budhlada, Punjab",
            dates: "2023 - Present"
        },
        {
            degree: "Senior Secondary (Arts Stream)",
            institution: "LADM DAV Public School, Budhlada, Punjab",
            dates: "2021 - 2023"
        },
        {
            degree: "Secondary Education",
            institution: "LADM DAV Public School, Budhlada, Punjab",
            dates: "2019 - 2021"
        }
    ],

    skills: {
        frontend: ["React.js", "Next.js", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS"],
        backend: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication"],
        database: ["MongoDB", "MongoDB Atlas", "Firebase", "SQL"],
        devops: ["Git", "PM2", "Nginx", "Vercel", "Render", "Hostinger VPS"],
        integrations: ["Razorpay", "Third-party APIs", "Webhooks"]
    },

    languages: [
        { name: "Punjabi", level: "Native" },
        { name: "Hindi", level: "Fluent" },
        { name: "English", level: "Conversational" }
    ]
};