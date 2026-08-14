# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.ts >> enables sending only for the server contract
- Location: tests\e2e\contact.spec.ts:25:1

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - paragraph [ref=e2]: Message
  - generic [ref=e3]:
    - generic [ref=e4] [cursor=pointer]
    - navigation "Mobile navigation" [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]:
          - link [ref=e10] [cursor=pointer]:
            - /url: /#contacts
            - paragraph [ref=e11]: contacts
        - listitem [ref=e14]:
          - link [ref=e15] [cursor=pointer]:
            - /url: /#about
            - paragraph [ref=e16]: about
        - listitem [ref=e19]:
          - link [ref=e20] [cursor=pointer]:
            - /url: /#portfolio
            - paragraph [ref=e21]: portfolio
    - generic [ref=e24] [cursor=pointer]:
      - generic [ref=e25]: RU
      - generic [ref=e26]: EN
  - banner [ref=e28]:
    - link "Логотип" [ref=e29]:
      - /url: /
      - img "Logo" [ref=e30]
      - paragraph [ref=e31]: SADOVNIKOV
    - button "Открыть меню" [ref=e32] [cursor=pointer]
  - main [ref=e36]:
    - generic [ref=e38]:
      - heading "FRONTEND DEVELOPER" [level=1] [ref=e39]
      - paragraph [ref=e47]: SADOVNIKOVVLAD
    - generic [ref=e51]:
      - generic [ref=e52]:
        - paragraph [ref=e53]: FRONTEND
        - paragraph [ref=e66]: 9/10
      - generic [ref=e67]:
        - paragraph [ref=e68]: BACKEND
        - paragraph [ref=e81]: 8/10
      - generic [ref=e82]:
        - paragraph [ref=e83]: WEB DESIGN
        - paragraph [ref=e96]: 6/10
      - generic [ref=e97]:
        - paragraph [ref=e98]: VIDEO EDITING
        - paragraph [ref=e111]: 5/10
    - generic [ref=e114]:
      - heading "MY STACK" [level=2] [ref=e115]
      - generic [ref=e118]:
        - generic [ref=e119]: Django
        - generic [ref=e120]: JavaScript
        - generic [ref=e121]: React
        - generic [ref=e122]: Python
        - generic [ref=e123]: SASS
        - generic [ref=e124]: PostgreSQL
        - generic [ref=e125]: MySQL
        - generic [ref=e126]: TypeScript
        - generic [ref=e127]: PHP
    - generic [ref=e129]:
      - heading "ABOUT ME" [level=2] [ref=e130]
      - generic [ref=e131]:
        - paragraph [ref=e132]: "Year of birth: 2004"
        - paragraph [ref=e133]: "Place of birth: Uzbekistan"
        - paragraph [ref=e134]: "Education: Konakovo Energy College, 2025"
        - paragraph [ref=e135]: "Location: Moscow, Russia"
      - generic [ref=e136]:
        - heading "WORK EXPERIENCE" [level=3] [ref=e137]
        - generic [ref=e138]:
          - generic [ref=e139]:
            - heading "Spetstechnologiya (Moscow) | Server Maintenance Engineer | July 2025 - Now" [level=4] [ref=e140]
            - paragraph [ref=e141]: Ensuring 24/7 uptime for development environments; configuring servers and CI/CD; assisting with frontend deployments through Nginx; reviewing Docker and Nginx configurations.
          - generic [ref=e142]:
            - heading "Freelance / Konakovo Energy College | Full-stack Developer | July 2025 - Now" [level=4] [ref=e143]
            - paragraph [ref=e144]: Full-cycle web development with Python, Django, React, JavaScript/TypeScript, SQL, and REST APIs. Built a college portal and a system for the local Education Department.
          - generic [ref=e145]:
            - heading "InfoTech (Moscow) | Assistant Engineer | July 2025 - Now" [level=4] [ref=e146]
            - paragraph [ref=e147]: Configuring MikroTik networks, troubleshooting IP cameras, and diagnosing network traffic with Wireshark.
      - generic [ref=e148]:
        - heading "SHORT BIO" [level=3] [ref=e149]
        - paragraph [ref=e150]: A proactive Frontend Developer with a full-stack background. I specialize in React and TypeScript, have more than three years of freelance experience, and work with server infrastructure, which helps me build more reliable web applications. I value clean code and am open to new opportunities in Moscow or remotely.
      - link [ref=e151]:
        - /url: /pageInDev
        - button [ref=e152] [cursor=pointer]:
          - paragraph [ref=e155]: MY LONG STORY, IF YOU INTERESTED
          - paragraph [ref=e156]: (click)
    - generic [ref=e158]:
      - heading "PORTFOLIO" [level=2] [ref=e159]
      - paragraph [ref=e161]: PROJECTS NOT FOUND
    - generic [ref=e164]:
      - heading "CONTACTS" [level=2] [ref=e165]
      - generic [ref=e167]:
        - textbox "Name..." [active] [ref=e169]: John
        - textbox "Email..." [ref=e171]: john@example.com
        - textbox "Message..." [ref=e174]: A valid message body.
        - button [ref=e175] [cursor=pointer]:
          - paragraph [ref=e178]: Send
  - contentinfo [ref=e179]:
    - generic [ref=e180]:
      - paragraph [ref=e185]: vlad.sad28@yandex.ru
      - link [ref=e186]:
        - /url: https://t.me/VlassaDassa
        - paragraph [ref=e190]: "@VlassaDassa"
      - paragraph [ref=e195]: +7 (900) 015-81-16
  - complementary "Development status notice":
    - generic [ref=e196]:
      - generic [ref=e197]:
        - strong [ref=e198]: This website is still in development
        - paragraph [ref=e199]: Some projects, descriptions, metrics and other content are temporary demonstration data and should not be treated as factual.
      - link [ref=e200]:
        - /url: https://github.com/VlassaDassa/Sadovnikov
        - button [ref=e201] [cursor=pointer]:
          - paragraph [ref=e202]: View source on GitHub
      - button [ref=e203] [cursor=pointer]:
        - paragraph [ref=e204]: ×
  - alert [ref=e205]
```