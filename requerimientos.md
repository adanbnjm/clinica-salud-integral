entidades principales: especialidad, medico, paciente y cita la entidad user no la ponemos aun pero la usaremos el miercoles
entidades:
especiadlidad
id int [`PK`]
nombre string unico, obligatorio

medico
id int [`PK`]
nombre string obligatorio
apellido string obligatorio
telefono string obligatorio
especialidad_id int [`FK`] obligatorio

paciente
id int [`PK`]
nombre string obligatorio
apellido string obligatorio
ci string unico,obligatorio
email string unico obligatorio
telefono string
direccion string
fecha_nacimiento datetime obligatorio

cita
id int [`PK`]
fecha_hora date time obligatorio
estado enum obligatorio
paciente_id int [`FK`] obligatorio
medico_id int [`FK`] obligatorio
estados de la cita que tendriamos: programada, completada y cancelada

relaciones que tenemos
una especialidad puede tener muchos medicos  
un medico pertenece a una unica especialidad
un paciente puede tener muchas citas
una cita pertenece a un unico paciente
un medico puede tener muchas citas
una cita pertenece a un unico medico

especialidad 1 ------ N medico
medico 1 ------N cita
paciente 1 ------ N cita
