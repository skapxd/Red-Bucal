import validator from "email-validator";
import withMiddleware from "../../middlewares/withMiddleware";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { data, RUC } = req.body;

        const entity = await req.db.collection("bussines").findOne({ RUC });

        if (entity.insurrance) {
            console.log(entity);

            let erroMessage = [];
            let cuotaAsegurado;

            for (let i = 8; i < data.length; i++) {
                let numErrors = erroMessage.length;

                let identification = data[i][1] + "";

                const user = await req.db
                    .collection("users")
                    .findOne({ identification });

                erroMessage[numErrors] = { row: i + 7 };
                if (user) {
                    if (user.plan == true) {
                        if (user.RUC !== RUC) {
                            erroMessage[numErrors][
                                "errorId"
                            ] = `El usuario registrado con la cedula ${identification} ya cuenta con una afiliacion a una entidad vigente`;
                        }
                    } else {
                        if (user.state === true) {
                            erroMessage[numErrors][
                                "errorId"
                            ] = `El usuario registrado con la cedula ${identification} ya cuenta con una cuenta personal activa`;
                        }
                    }
                }

                if (
                    JSON.stringify(erroMessage[numErrors]) ===
                    `{"row":${i + 7}}`
                ) {
                    erroMessage.pop();
                }
            }

            if (erroMessage.length) {
                return res.json({
                    status: "fileError",
                    message: erroMessage,
                });
            }

            let userContinue = [];

            entity.identifications.forEach(async (user) => {
                for (let i = 8; i < data.length; i++) {
                    if (user.id === data[i][1] + "") {
                        console.log(user.id, data[i][1]);
                        userContinue.push(user);
                    }
                }

                await req.db.collection("users").update(
                    { identification: user.id },
                    {
                        $set: {
                            RUC: "",
                            state: false,
                            plan: false,
                            start: "",
                            end: "",
                        },
                    }
                );
            });

            console.log(userContinue);

            const start = new Date();
            const end = new Date();
            end.setMonth(end.getMonth() + 1);

            for (let i = 8; i < data.length; i++) {
                const userExist = await req.db
                    .collection("users")
                    .findOne({ identification: data[i][1] + "" });

                if (!userExist) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPasswordUser = await bcrypt.hash(
                        data[i][1] + "",
                        salt
                    );

                    await req.db.collection("users").insertOne({
                        RUC,
                        state: true,
                        start: start,
                        end: end,
                        name: data[i][0],
                        identification: data[i][1] + "",
                        birthdate: data[i][3],
                        adress: "",
                        phone: "",
                        email: "",
                        password: hashedPasswordUser,
                        know: 5,
                        plan: true,
                        service: false,
                        terminos: true,
                        historial: [],
                        mustChangePass: true,
                        alerts: {
                            week: false,
                            month: false,
                        },
                        date: start,
                        dependeOf: data[i][2] ? data[i][2] : "",
                        dependientes: [],
                    });

                    if (data[i][2]) {
                        await req.db.collection("users").findOneAndUpdate(
                            { identification: data[i][2] + "" },
                            {
                                $push: {
                                    dependientes: data[i][1] + "",
                                },
                            }
                        );
                    }

                    userContinue.push({
                        id: data[i][1] + "",
                        name: data[i][0],
                    });
                } else {
                    await req.db.collection("users").update(
                        { identification: data[i][1] + "" },
                        {
                            $set: {
                                RUC,
                                plan: true,
                                state: true,
                                start,
                                end,
                            },
                        }
                    );
                }
            }

            console.log(userContinue);

            cuotaAsegurado = data[6][1];

            if (!cuotaAsegurado) {
                return res.json({
                    status: "error",
                    message: "El excel no incluye la cuota por cada asegurado",
                });
            }

            const business = await req.db
                .collection("bussines")
                .findOneAndUpdate(
                    { RUC },
                    {
                        $set: {
                            start,
                            end,
                            identifications: userContinue,
                        },
                    },
                    {
                        returnOriginal: false,
                    }
                );

            res.status(201).json({
                status: "ok",
                message: "Aseguradora actualizada satisfactoriamente",
                data: business.value,
            });
        } else {
            res.status(201).json({
                status: "ok",
                message: "Empresa actualizada satisfactoriamente",
            });
        }
    } else {
        res.status(405).end();
    }
};

export default withMiddleware(handler);
