import validator from "email-validator";
import withMiddleware from '../../middlewares/withMiddleware'
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { businessName, RUC, businessAdress, businessPhone, businessMail, data, know, password } = req.body

        if (!validator.validate(businessMail)) {

            res.json({
                status: 'error',
                message: 'el correo es invalido'
            })

        } else {
            try {

                const countEmail = await req.db.collection('bussines').countDocuments({ businessMail })

                if (countEmail) {

                    res.send({
                        status: 'error',
                        message: 'El correo ya ha sido registrado',
                    });

                } else {

                    const countRUC = await req.db.collection('bussines').countDocuments({ RUC })

                    if (countRUC) {

                        res.send({
                            status: 'error',
                            message: 'el RUC ya ha sido registrado',
                        });

                    } else {
                        const salt = await bcrypt.genSalt(10)
                        const hashedPassword = await bcrypt.hash(password, salt)

                        let identifications = []

                        for (let i = 6; i < data.length; i++) {

                            let identification = data[i][2] + ''

                            let countId = await req.db.collection('users').countDocuments({ identification })

                            if (countId) {
                                
                            } else {
                                identifications.push({
                                    id: data[i][2] + '',
                                    name: data[i][1]
                                })
                            }
                        }
                        console.log(identifications);

                        const business = await req.db.collection('bussines').insertOne({
                            state: false,
                            name: businessName,
                            RUC,
                            businessAdress,
                            password: hashedPassword,
                            businessPhone,
                            businessMail,
                            know,
                            identifications,
                            plan: false,
                            service: false,
                            terminos: true
                        })

                        req.session.businessId = await business.insertedId

                        for (let i = 6; i < data.length; i++) {

                            let identification = data[i][2]+''

                            let countId = await req.db.collection('users').countDocuments({ identification })

                            if (countId) {
                                console.log(i + 'ya existe');
                            } else {
                                const hashedPasswordUser = await bcrypt.hash(data[i][2] + '', salt)

                                await req.db.collection('users').insertOne({
                                    RUC,
                                    state: false,
                                    date: data[i][0],
                                    name: data[i][1],
                                    identification: data[i][2] + '',
                                    birthdate: data[i][3],
                                    adress: data[i][4],
                                    phone: data[i][5],
                                    email: data[i][6],
                                    password: hashedPasswordUser,
                                    know: 5,
                                    plan: false,
                                    service: false,
                                    terminos: true,
                                    historial: [],
                                })
                            }
                        }
                        res.status(201).json({
                            status: 'ok',
                            message: 'Empresa agregada satisfactoriamente',
                            token: business.insertedId
                        })

                    }
                }
                
            } catch (error) {
                res.json({
                    status: 'error',
                    message: error.toString()
                })
            }

        }
    } else {
        res.status(405).end();
    }
}

export default withMiddleware(handler)