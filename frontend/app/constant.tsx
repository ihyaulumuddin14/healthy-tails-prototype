export const navbarLink = [
   {
      name: 'Home',
      path: '/home',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"></path></svg>
   },
   {
      name: 'Services',
      path: '/services',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.63 21.91A.9.9 0 0 0 12 22a1 1 0 0 0 .41-.09C22 17.67 21 7 21 6.9a1 1 0 0 0-.55-.79l-8-4a1 1 0 0 0-.9 0l-8 4A1 1 0 0 0 3 6.9c0 .1-.92 10.77 8.63 15.01zM5 7.63l7-3.51 7 3.51c.05 2-.27 9-7 12.27C5.26 16.63 4.94 9.64 5 7.63z"></path><path d="M11.06 16h2v-3h3.01v-2h-3.01V8h-2v3h-3v2h3v3z"></path></svg>
   },
   {
      name: 'Shop',
      path: '/shop',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 0 0-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 0 0-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z"></path></svg>
   },
   {
      name: 'Daily',
      path: '/daily',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.875 3H4.125C2.953 3 2 3.897 2 5v14c0 1.103.953 2 2.125 2h15.75C21.047 21 22 20.103 22 19V5c0-1.103-.953-2-2.125-2zm0 16H4.125c-.057 0-.096-.016-.113-.016-.007 0-.011.002-.012.008L3.988 5.046c.007-.01.052-.046.137-.046h15.75c.079.001.122.028.125.008l.012 13.946c-.007.01-.052.046-.137.046z"></path><path d="M6 7h6v6H6zm7 8H6v2h12v-2h-4zm1-4h4v2h-4zm0-4h4v2h-4z"></path></svg>
   },
   {
      name: 'FAQ',
      path: '/faq',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4C9.243 4 7 6.243 7 9h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.069-.454 1.465-1.481 2.255-.382.294-.813.626-1.226 1.038C10.981 13.604 10.995 14.897 11 15v2h2v-2.009c0-.024.023-.601.707-1.284.32-.32.682-.598 1.031-.867C15.798 12.024 17 11.1 17 9c0-2.757-2.243-5-5-5zm-1 14h2v2h-2z"></path></svg>
   }
]

export const quickAccessList = [
   {
      name: 'Edit Profile',
      link: '/user/profile/info',
      color: '--color-chart-2',
      icons: <svg className="w-15 h-15 text-[var(--color-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"/></svg>
   },
   {
      name: 'Live Queue',
      link: '/user/profile/queue',
      color: '--color-chart-1',
      icons: <svg className="w-15 h-15 text-[var(--color-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z"/></svg>
   },
   {
      name: 'Add Pet',
      link: '/user/profile/pets',
      color: '--color-chart-3',
      icons: <svg className="w-15 h-15" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path><path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path></svg>
   },
   {
      name: 'Book New Visit',
      link: '/user/profile/appointments',
      color: '--color-chart-4',
      icons: <svg className="w-15 h-15" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M17 2H7a2 2 0 0 0-2 2v18l7-4.848L19 22V4a2 2 0 0 0-2-2zm-1 9h-3v3h-2v-3H8V9h3V6h2v3h3v2z"></path></svg>
   }
]


export const sidebarUserLink = [
   {
      name: 'Account Info',
      path: '/user/profile/info',
      icons: <svg className="w-6 h-6 text-[var(--color-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/></svg>
   },
   {
      name: 'Change Password',
      path: '/user/profile/password',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M3.433 17.325 3.079 19.8a1 1 0 0 0 1.131 1.131l2.475-.354C7.06 20.524 8 18 8 18s.472.405.665.466c.412.13.813-.274.948-.684L10 16.01s.577.292.786.335c.266.055.524-.109.707-.293a.988.988 0 0 0 .241-.391L12 14.01s.675.187.906.214c.263.03.519-.104.707-.293l1.138-1.137a5.502 5.502 0 0 0 5.581-1.338 5.507 5.507 0 0 0 0-7.778 5.507 5.507 0 0 0-7.778 0 5.5 5.5 0 0 0-1.338 5.581l-7.501 7.5a.994.994 0 0 0-.282.566zM18.504 5.506a2.919 2.919 0 0 1 0 4.122l-4.122-4.122a2.919 2.919 0 0 1 4.122 0z"></path></svg>
   },
   {
      name: 'My Pets',
      path: '/user/profile/pets',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path><path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path></svg>
   },
   {
      name: 'Appointments',
      path: '/user/profile/appointments',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"></path><path d="M7 9h10v2H7zm0 4h5v2H7z"></path></svg>
   },
   {
      name: 'Live Queue',
      path: '/user/profile/queue',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M12 5c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path><path d="M12 9c-1.627 0-3 1.373-3 3s1.373 3 3 3 3-1.373 3-3-1.373-3-3-3z"></path></svg>
   }
]

export const sidebarAdminLink = [
   {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2zM5 20v-8h14l.002 8H5zM5 6h14v2H5zm2-4h10v2H7z"></path></svg>
   },
   {
      name: 'Clients',
      path: '/admin/clients',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-6 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM19 15H9v-.25C9 12.901 11.254 11 14 11s5 1.901 5 3.75V15z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z"></path></svg>
   },
   {
      name: 'Pets',
      path: '/admin/pets',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path><path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path></svg>
   },
   {
      name: 'Medical Records',
      path: '/admin/records',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z"></path></svg>
   },
   {
      name: 'Configures',
      path: '/admin/configures',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path></svg>
   },
   {
      name: 'Settings',
      path: '/admin/settings',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path></svg>
   }
]


export const serviceLists = [
   {
      name: "Physical Exam",
      summary: "Routine checkups are the foundation of preventive care. We assess your pet’s overall health, monitor vital signs, and detect early signs of illness—before they become serious.",
      articles: {
         id: 'physical-exam',
         subtitle: "Keeping Your Feline Healthy from Head to Tail",
         content: "A physical exam is the foundation of your cat’s health care. This service includes a thorough evaluation of the cat’s body condition: eyes, ears, mouth and teeth, skin, fur, and vital organs such as the heart and lungs. The vet will check body temperature, heart rate, breathing, and any hidden signs of illness.Regular check-ups are recommended every 6 months or at least once a year to prevent more serious health problems in the future.",
         image: "/article/physical-exam.webp"
      }
   },
   {
      name: "Vaccination",
      summary: "Keep your pet protected with essential vaccinations tailored to their age, breed, and lifestyle. We provide up-to-date immunizations to prevent dangerous diseases.",
      articles: {
         id: 'vaccination',
         subtitle: "Protect Your Cat from Life-Threatening Diseases",
         content: "Vaccines play a vital role in preventing contagious and dangerous diseases such as rabies, panleukopenia, calicivirus, and rhinotracheitis. Every kitten should receive core vaccines at the age of 6–8 weeks, followed by boosters as scheduled by the vet. Our clinic offers complete vaccination services, including annual vaccines and boosters. Vaccination is also required before boarding or interaction with other cats.",
         image: "/article/vaccination.webp"
      }
   },
   {
      name: "Ward Unit",
      summary: "Our clean, calm ward unit provides a safe recovery space for pets requiring observation or post-surgery rest—with constant monitoring and gentle care.",
      articles: {
         id: 'ward-unit',
         subtitle: 'Intensive Monitoring by Our Experienced Medical Team',
         content: "Our Ward Unit is designed to provide extended care for cats recovering from major illnesses, surgeries, or trauma. The room is equipped with individual cages, a monitoring system, and controlled temperature for comfort. Veterinarians and veterinary nurses will closely monitor your cat, administer medication regularly, and ensure comfort during recovery. Owners will receive regular updates on their cat’s condition.",
         image: "/article/ward-unit.webp"
      }
   },
   {
      name: "Major & Minor Surgeries",
      summary: "From minor procedures to complex operations, our experienced veterinary team ensures your pet is in safe, expert hands—using modern tools and strict safety protocols.",
      articles: {
         id: 'surgeries',
         subtitle: "Advanced Surgical Procedures for Your Feline Friend",
         content: "Includes procedures such as deep wound cleaning, abscess removal, or abnormal nail extraction. These are performed under local or mild general anesthesia. Includes sterilization (spaying/neutering), tumor removal, gastrointestinal surgery, or bone repair. Performed by a licensed veterinary surgeon following full anesthesia protocols. Post-surgery, patients may stay in our Ward Unit for proper recovery and monitoring.",
         image: "/article/minor-surgery.webp"
      }
   },
   {
      name: "Therapeutic Diet",
      summary: "Every pet's health journey is unique—and nutrition plays a key role. We provide veterinary-recommended therapeutic diets tailored to specific medical conditions such as kidney disease, allergies, obesity, and more.",
      articles: {
         id: 'therapeutic-diet',
         subtitle: "Nutrition Therapy That Supports Healing",
         content: 'Cats with medical conditions such as kidney disease, obesity, food allergies, or diabetes require special diets. Our therapeutic diet service includes vet-approved product recommendations and regular monitoring of your cat’s nutritional needs. Our veterinarian will determine the appropriate food type, daily portion, and feeding method. Products are available at the clinic or can be ordered through our Shop page.',
         image: "/article/diet.webp"
      }
   },
]


export const sliderImageLists = [
   {
      url: "/slider/slider (1).webp"
   },
   {
      url: "/slider/slider (2).webp"
   },
   {
      url: "/slider/slider (3).webp"
   },
   {
      url: "/slider/slider (4).webp"
   },
   {
      url: "/slider/slider (5).webp"
   },
   {
      url: "/slider/slider (6).webp"
   },
   {
      url: "/slider/slider (7).webp"
   },
   {
      url: "/slider/slider (8).webp"
   },
   {
      url: "/slider/slider (9).webp"
   },
   {
      url: "/slider/slider (10).webp"
   }
]


export const teamMembers = [
   {
      id: 1,
      name: "drh. Ling Sandra A.H.",
      noSIP: "SIP.100.3.12/126.0015/35.73.406/2024",
      role: "Veterinarian",
      image: "/veterinarian/drh.Ling_Sandra.png",
      description: "A graduate of the University of Brawijaya with a Doctor of Veterinary Medicine degree, currently based in Malang, East Java, and the owner of Healthy Tails, a veterinary service business focused on pet health and clinical care.",
      socialMedia: [
         {
            platform: "instagram",
            url: "https://www.instagram.com/lingalkahfi/"
         },
         {
            platform: "linkedin",
            url: "linkedin.com/in/ling-sandra-aryastyani-hajar-al-kahfi-56540a265"
         }
      ]
   },
   {
      id: 2,
      name: "drh. Neila Rahma H.",
      noSIP: "SIP.100.3.12/126.0014/35.73.406/2024",
      role: "Veterinarian",
      image: "/veterinarian/drh.Neila_Rahma.png",
      description: "A veterinarian based in Malang Regency, East Java, who earned a Doctor of Veterinary Medicine degree from Universitas Gadjah Mada in 2020 and is committed to providing quality veterinary care.",
      socialMedia: [
         {
            platform: "instagram",
            url: "https://www.instagram.com/neilarah/"
         },
         {
            platform: "linkedin",
            url: "linkedin.com/in/neila-rahma-habibah-a0411313a"
         }
      ]
   },
   {
      id: 3,
      name: "Dwiky Yayan F.",
      noSIP: "",
      role: "Vet Assistant",
      image: "/veterinarian/Dwiky_Yayan.png",
      description: "A veterinary assistant with hands-on experience in supporting clinical procedures, animal care, and day-to-day operations in a veterinary practice.",
      socialMedia: [
         {
            platform: "instagram",
            url: "https://www.instagram.com/_dwikyyayan/"
         }
      ]
   }
]

export const openHours = [
   {
      day: "Monday",
      open: "08:30",
      close: "17:00"
   },
   {
      day: "Tuesday",
      open: "08:30",
      close: "17:00"
   },
   {
      day: "Wednesday",
      open: "08:30",
      close: "17:00"
   },
   {
      day: "Thursday",
      open: "08:30",
      close: "17:00"
   },
   {
      day: "Friday",
      open: "08:30",
      close: "17:00"
   },
   {
      day: "Saturday",
      open: "08:30",
      close: "17:00"
   },
   {
      day: "Sunday",
      open: "08:30",
      close: "17:00"
   }
]


export const reviewClients = [
   {
      name: "Jung Dama",
      imgSrc: "/review/review1.png",
      reviewText: "sdh 3x sterilkan kucing di sini, yg kali ini lg dpt promo harga murah🙂‍↕️pelayanan dokter dan perawat jg sangat baik, Masya Allah 🥹🫰🏻 …",
      rating: 5
   },
   {
      name: "Moie Meisje",
      imgSrc: "/review/review2.png",
      reviewText: "sangat puas pelayanannya staff & dokternya baik dan ramahh, tempatnya juga nyaman, banyak promo jugaa😍😍 …",
      rating: 4.5
   },
   {
      name: "Andhika Akhmad",
      imgSrc: "/review/review3.png",
      reviewText: "Pelayanannya bagus, dokternya ramah menjelaskan semuanya dengan jelas dan sabar. Hewan peliharaan saya juga merasa nyaman selama di sana. Sangat direkomendasikan...",
      rating: 5
   }
]


export const favoriteProducts = [
   {
      productName: "Royal Canin Gastrointestinal Hairball 400 gr",
      srcImg: "/products/product (1).png",
      price: 65000,
      rating: 5.0,
      sold: 5
   },
   {
      productName: "Drontal Cat ORIGINAL!",
      srcImg: "/products/product (2).png",
      price: 23000,
      rating: 5.0,
      sold: 1
   },
   {
      productName: "Royal Canin GI fibre response 400 gram",
      srcImg: "/products/product (3).png",
      price: 77800,
      rating: 5.0,
      sold: 2
   },
   {
      productName: "Royal Canin Urinary SO sachet/pouch",
      srcImg: "/products/product (4).png",
      price: 22500,
      rating: 5.0,
      sold: 10
   },
   {
      productName: "Royal Canin Renal Special 400 gram",
      srcImg: "/products/product (5).png",
      price: 92000,
      rating: 5.0,
      sold: 5
   }
]


export const HomeSections = [
   {
      name: "Home",
      sectionID: "home"
   },
   {
      name: "History",
      sectionID: "history"
   },
   {
      name: "Service",
      sectionID: "service"
   },
   {
      name: "Veterinarian",
      sectionID: "veterinarian"
   },
   {
      name: "Hours",
      sectionID: "hours"
   },
   {
      name: "Feedback",
      sectionID: "feedback"
   },
   {
      name: "Shop",
      sectionID: "shop"
   }
]


export const faqData = [
  {
    question: "What types of animals do you treat at Healthy Tails?",
    answer: "At Healthy Tails, we primarily treat cats, but we also accept other small animals such as rabbits and, depending on the case, small dogs. If you're unsure, feel free to contact us first."
  },
  {
    question: "How do I make a reservation for my pet?",
    answer: "You can book an appointment directly through our website or by sending us a message via WhatsApp. Both options are easy and convenient."
  },
  {
    question: "Can I just walk in, or is an appointment required?",
    answer: "We recommend making a reservation in advance to ensure a smooth visit, but we do accept walk-ins when our schedule allows."
  },
  {
    question: "I’m not sure if my pet needs to visit. Can I just ask questions via WhatsApp?",
    answer: "Absolutely! We’re happy to answer general inquiries via WhatsApp before you decide to book an appointment."
  },
  {
    question: "Do you offer grooming or only medical services?",
    answer: "Currently, Healthy Tails focuses on medical check-ups, vaccinations, minor treatments, and general wellness care. Grooming services are not available at the moment."
  },
  {
    question: "What are some common symptoms I should watch out for in my cat?",
    answer: "Watch out for lethargy, appetite loss, sudden aggression, sneezing, vomiting, diarrhea, or abnormal behavior. These can be signs your cat needs medical attention."
  },
  {
    question: "Do you treat rabbits?",
    answer: "Yes, we do accept rabbit patients! If you’re unsure about the type of care needed, contact us to check if it falls within our services."
  },
  {
    question: "Can I cancel or reschedule my reservation?",
    answer: "Yes, you can cancel or reschedule your appointment by contacting us through the same method you used to book — either web or WhatsApp."
  },
  {
    question: "What should I prepare before bringing my pet in?",
    answer: "Bring your pet’s health record (if available), any recent medication info, and keep your pet safely secured in a carrier or leash."
  },
  {
    question: "Do you offer advice for new pet owners?",
    answer: "Definitely! We love helping new cat or rabbit parents. Ask us in person or via WhatsApp for basic care tips, feeding guidelines, and early warning signs to watch for."
  }
];


export const pet1 = {
   _id: '1',
   name: "Mocky",
   type: "Cat",
   race: "Persia",
   color: "Brown",
   birthDate: new Date(),
   age: 1,
   gender: "Male",
   owner: "John Doe"
}