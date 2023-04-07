import jwt from 'jsonwebtoken'


const generateToken = (id: string) => {
    return jwt.sign({ id }, '64b04d41c5f713e4103c7ac0b38e77a2', {
        expiresIn: '30d',
    })
}

export { generateToken }

