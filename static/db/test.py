# import sqlite3

# conn = sqlite3.connect('doctain.db')
# c = conn.cursor()

# c.execute("""CREATE TABLE IF NOT EXISTS doctorsdetails (
#                id INTEGER PRIMARY KEY,
#                firstname TEXT NOT NULL,
#                lastname TEXT NOT NULL,
#                email TEXT NOT NULL,
#                age INTEGER NOT NULL,
#                specialization TEXT NOT NULL,
#                phonenumber INTEGER NOT NULL,
#                address TEXT NOT NULL
#             )""")

# c.execute("""INSERT INTO doctorsdetails (id, firstname, lastname, email, age, specialization, phonenumber, address) 
#              VALUES 

#                 (1, 'Senal', 'Silva', 'senal3fernando@gmail.com', 34, 'cancer', 99886676, 'Galle'),
#                 (2, 'Chamod', 'Silva', 'senal3fernando@gmail.com', 35, 'Fever', 99876676, 'Negombo'),
#                 (3, 'John', 'Doe', 'johndoe@email.com', 28, 'Drug reaction', 55512345, 'New York'),
#                 (4, 'Sarah', 'Johnson', 'sarahj@gmail.com', 42, 'Peptic ulcer disease', 55587654, 'Los Angeles'),
#                 (5, 'David', 'Lee', 'davidl@gmail.com', 52, 'AIDS', 55555212, 'San Francisco'),
#                 (6, 'Emily', 'Chen', 'emilyc@yahoo.com', 25, 'Diabetes', 55577788, 'Houston'),
#                 (7, 'Michael', 'Nguyen', 'michaeln@gmail.com', 33, 'Hypertension', 55443333, 'Chicago'),
#                 (8, 'Jessica', 'Liu', 'jessicaliu@gmail.com', 29, 'Migraine', 555222111, 'Seattle'),
#                 (9, 'Ryan', 'Wong', 'ryanwong@yahoo.com', 45, 'Cervical spondylosis', 555667777, 'Boston'),
#                 (10, 'Hannah', 'Kim', 'hannahk@gmail.com', 27, 'Paralysis (brain hemorrhage)', 558889999, 'Atlanta'),
#                 (11, 'Adam', 'Jones', 'adamjones@gmail.com', 38, 'Jaundice', 555999000, 'Dallas'),
#                 (12, 'Samantha', 'Smith', 'samanthas@gmail.com', 31, 'Hypothyroidism', 555778888, 'Miami'),              
#                 (13, 'Ethan', 'Brown', 'ethanb@yahoo.com', 43, 'Hyperthyroidism', 555445555, 'Philadelphia'),
#                 (14, 'Olivia', 'Taylor', 'oliviataylor@gmail.com', 24, 'Hypoglycemia', 555333222, 'Denver'),
#                 (15, 'Andrew', 'Ng', 'andrewng@yahoo.com', 36, 'Osteoarthristis', 555667777, 'San Diego'),
#                 (16, 'Grace', 'Kim', 'gracek@gmail.com', 30, 'Arthritis', 555221111, 'Portland'),
#                 (17, 'Jacob', 'Lee', 'jacoblee@gmail.com', 29, 'Vertigo (Paroxysmal Positional Vertigo)', 555778888, 'Austin'),
#                 (18, 'Isabella', 'Garcia', 'isabellag@yahoo.com', 26, 'Acne', 555990000, 'San Antonio'),
#                 (19, 'Noah', 'Martinez', 'noahm@yahoo.com', 40, 'Psoriasis', 555112222, 'Phoenix'),
#                 (20, 'Ava', 'Hernandez', 'avah@gmail.com', 22, 'Impetigo', 554443333, 'Las Vegas'),
#                 (21, 'William', 'Jackson', 'williamj@yahoo.com', 33, 'insomnia', 555551212, 'Charlotte'),
#                 (22, 'Sophia', 'Perez', 'sophiap@gmail.com', 28, 'allergies', 555986543, 'Houston'),
#                 (23, 'James', 'Gonzalez', 'jamesg@gmail.com', 45, 'arthritis', 555123567, 'New Orleans'),
#                 (24, 'Mia', 'Rivera', 'miar@yahoo.com', 39, 'back pain', 555444333, 'San Francisco'),
#                 (25, 'Benjamin', 'Miller', 'benjaminm@gmail.com', 41, 'diabetes', 555778888, 'Seattle'),
#                 (26, 'Charlotte', 'Davis', 'charlotted@yahoo.com', 26, 'migraine', 552221111, 'Los Angeles'),
#                 (27, 'Elijah', 'Garcia', 'elijahg@gmail.com', 37, 'hypertension', 555666777, 'Miami'),
#                 (28, 'Amelia', 'Martinez', 'ameliam@yahoo.com', 23, 'asthma', 555555212, 'Dallas'),
#                 (29, 'Lucas', 'Lopez', 'lucasl@yahoo.com', 30, 'depression', 555889999, 'Chicago'),
#                 (30, 'Lily', 'Wilson', 'lilyw@gmail.com', 32, 'anxiety', 555333222, 'San Diego')
#                 """)


# conn.commit()
# conn.close()

import sqlite3

conn = sqlite3.connect('doctain.db')
cur = conn.cursor()

cur.execute('''
            CREATE TABLE `usersdetails` (
            `id` int NOT NULL,
            `username` varchar(50) NOT NULL,
            `password` varchar(50) NOT NULL,
            `name` varchar(45) NOT NULL,
            `email` varchar(100) NOT NULL,
            `country` varchar(45) NOT NULL,
            `birthday` date NOT NULL,
            `gender` varchar(45) NOT NULL,
            `bookmark`varchar(100) NOT NULL,
            PRIMARY KEY (`id`)
            )
            )''')

#cur.execute("INSERT INTO userdetails (id, username, password, email) VALUES (?, ?, ?, ?)", (1, 'test', 'test', 'test@test.com'))
# cur.execute("INSERT INTO userdetails (id, username, password, email) VALUES (?, ?, ?, ?)", (2, 'test2', 'test2', 'test2@test.com'))

conn.commit()

cur.close()
conn.close()




