import bcrypt from "bcryptjs"
import withMiddleware from "../../middlewares/withMiddleware"

const handler = async (req, res) => {
    if( req.method === 'POST' ) {
        const { identification, password } = req.body
        const RUC = identification;
        
        try {
        
        const business = await req.db.collection('bussines').findOne({ RUC })

        if (business) {
            
            const result = await bcrypt.compare(password, business.password)

            if(result) {

                req.session.businessId = business._id
                if (req.session.userId) {
                    delete req.session.userId
                }

                res.send({
                    status: 'ok_business',
                    message: `Bienvenido de vuelta ${business.name}`,
                    id: business._id
                })

            } else {
                res.send({
                    status: 'error',
                    message: 'contraseña invalida'
                })
            }

        } else {

            const user = await req.db.collection('users').findOne({ identification })

            if ( user ) {
    
                const result = await bcrypt.compare(password, user.password)
    
                if (result) {
    
                    req.session.userId = user._id
                    if (req.session.businessId) {
                        delete req.session.businessId
                    }
                    res.send({
                        status: 'ok_user',
                        message: `Bienvenido de vuelta ${user.name}`,
                        id: user._id
                    })
    
                } else {
                    res.send({
                        status: 'error',
                        message: 'contraseña invalida'
                    })
                }
            } else {
                res.send({
                    status: 'error',
                    message: 'El usuario no existe'
                })
            }
        }

        } catch (error) {
            res.send({
                status: 'error',
                message: error.toString()
            })
        }

    } else {
        res.status(405).end()
    }
}

export default withMiddleware(handler)