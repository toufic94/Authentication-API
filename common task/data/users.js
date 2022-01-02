import bcrypt from 'bcryptjs'

const users = [
    [
        'Admin User',
        '',
        'admin@example.com',
        bcrypt.hashSync('123456',10),
        'admin'
],
    [
        'John',
        'Doe',
        'john@example.com',
        bcrypt.hashSync('123456',10),
        'client'
    ],
    [
        'Jane',
        'Doe',
        'Jane@example.com',
        bcrypt.hashSync('123456',10),
        'client'
    ]
]

export default users