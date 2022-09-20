export const queries = {
    getAllPatients : "SELECT c.IdCuidadosPaliativos, Fld_Rut AS RunSinDV, CONCAT(Fld_Rut, '-', Fld_Dv) AS Run, CONCAT(p.Fld_Nombres, ' ', p.Fld_PrimerApellido, ' ', p.Fld_SegundoApellido) AS Nombres, f.Fld_Ficha AS Ficha, CASE WHEN p.Fld_Fallecido = 0 OR c.Fallecido = 1 THEN 'Fallecido' ELSE '' END AS EstadoFallecido, (SELECT COUNT(*) FROM Controles WHERE Run = c.Run) AS CantidadControles, DATEDIFF(DAY, c.FechaIpd, c.FechaIngreso) AS DiasCorridos, c.Estado, c.EvaIngreso, c.PsIngreso, c.EdadIngreso, c.Diagnostico, c.Observaciones FROM PruebasAlex.dbo.CuidadosPaliativos c INNER JOIN PhoenixPaciente AS p ON c.Run = p.Fld_Rut INNER JOIN PhoenixFichaClinica AS f ON p.Fld_Numero = f.Fld_Paciente ORDER BY c.IdCuidadosPaliativos",
    getPatientByRun: "SELECT Fld_Rut AS RunSinDV, CONCAT(Fld_Rut, '-', Fld_Dv) AS RunCompleto, CONCAT(p.Fld_Nombres, ' ', p.Fld_PrimerApellido, ' ', p.Fld_SegundoApellido) AS Nombres, f.Fld_Ficha AS Ficha, CASE WHEN p.Fld_Fallecido = 0 THEN 'Fallecido/a' ELSE '' END AS EstadoFallecido, CASE WHEN p.Fld_Sexo = 1 THEN 'AvatarMale.png' ELSE 'AvatarFemale.png' END AS Avatar, (SELECT COUNT(*) FROM Controles WHERE Run = c.Run) AS CantidadControles, DATEDIFF (DAY, c.FechaIpd, c.FechaIngreso ) AS DiasCorridos, c.* FROM PruebasAlex.dbo.CuidadosPaliativos c INNER JOIN PhoenixPaciente AS p ON c.Run = p.Fld_Rut INNER JOIN PhoenixFichaClinica AS f ON p.Fld_Numero = f.Fld_Paciente WHERE Fld_Rut = @runPatient ORDER BY IdCuidadosPaliativos",
    getPatientPhoenixByRun : "SELECT top 1 Fld_Rut AS RunSinDV, CONCAT(Fld_Rut,'-', Fld_Dv) AS Run, f.Fld_Ficha AS Ficha, CONCAT(Fld_Nombres, ' ', Fld_PrimerApellido, ' ', Fld_SegundoApellido) AS Nombres,  FLOOR (DATEDIFF (DAY, Fld_FechaNacimiento, GetDate ()) / 365.25) AS Edad, CONVERT(varchar,Fld_FechaNacimiento, 103) AS FechaNacimiento, p.Fld_Direccion AS Domicilio FROM dbo.PhoenixPaciente AS p INNER JOIN PhoenixFichaClinica AS f ON f.Fld_Paciente = p.Fld_Numero WHERE p.Fld_Rut = @runPatient",
    addNewPatient: "INSERT INTO dbo.CuidadosPaliativos (Run, EvaIngreso, PsIngreso, Conocimiento, PacientePresente, LugarIngreso, Diagnostico, Comite, EdadIngreso, FechaIpd, FechaSolicitudIngreso, FechaIngreso, MedicoIngreso, MedicoDerivador, AnalgesiaPrevia, UsuarioOncologico, Domicilio, Observaciones, Estado) VALUES (@Run, @EvaIngreso, @PsIngreso, @Conocimiento, @PacientePresente, @LugarIngreso, @Diagnostico, @Comite, @EdadIngreso, @FechaIPD, @FechaSolicitud, @FechaIngreso, @MedicoIngresa, @MedicoDeriva, @AnalgesiaPrevia, @UsuarioOncologico, @Domicilio, @Observaciones, 0)",
    getAllControls: "SELECT IdControl, c.Run, CONCAT(p.Fld_Nombres, ' ', p.Fld_PrimerApellido, ' ', p.Fld_SegundoApellido) AS Nombres, TipoControl, Observaciones, CONVERT(VARCHAR,FechaControl,103) AS FechaControl, EdadControl, u.name AS Responsable FROM PruebasAlex.dbo.Controles AS c INNER JOIN PhoenixPaciente AS p ON c.Run = p.Fld_Rut INNER JOIN users AS u ON c.RunResponsable = u.run ORDER BY FechaControl DESC",
    getAllControlsByRun: "SELECT IdControl, Run, TipoControl, Observaciones,CONVERT(VARCHAR,FechaControl,103) AS FechaControl, EdadControl FROM dbo.Controles WHERE Run = @runPatient",
    getControlById: "SELECT IdControl, Run, TipoControl, Observaciones,CONVERT(VARCHAR,FechaControl,103) AS FechaControl, EdadControl FROM dbo.Controles WHERE IdControl = @idControl",
    addNewControl: "INSERT INTO dbo.Controles (Run, TipoControl, Observaciones, FechaControl, EdadControl, FechaRegistro, RunResponsable) VALUES (@Run, @TipoControl, @Observaciones, @FechaControl, (SELECT TOP 1 FLOOR (DATEDIFF (DAY, Fld_FechaNacimiento, GetDate ()) / 365.25) AS Edad FROM dbo.PhoenixPaciente WHERE Fld_Rut = @Run), GETDATE(), @RunResponsable)",
    deleteControl: "DELETE FROM dbo.Controles WHERE IdControl = @IdControl",
    updatePatientByRun: "UPDATE dbo.CuidadosPaliativos SET EvaIngreso = @EvaIngreso, PsIngreso = @PsIngreso, Conocimiento = @Conocimiento, PacientePresente = @PacientePresente, LugarIngreso = @LugarIngreso, Diagnostico = @Diagnostico, Comite = @Comite, EdadIngreso = @EdadIngreso, FechaIpd = @FechaIpd, FechaSolicitudIngreso = @FechaSolicitud, FechaIngreso = @FechaIngreso, MedicoIngreso = @MedicoIngresa, MedicoDerivador = @MedicoDeriva, AnalgesiaPrevia = @AnalgesiaPrevia, UsuarioOncologico = @UsuarioOncologico, Domicilio = @Domicilio, Observaciones = @Observaciones WHERE Run = @runPatient",
    updateControlById : "UPDATE dbo.Controles SET TipoControl = @TipoControl, Observaciones = @Observaciones, FechaControl = @FechaControl, EdadControl = @EdadControl, RunResponsable = @RunResponsable WHERE IdControl = @idControl",
    validateUser: "SELECT id, run, [name], email, [password], IdState FROM dbo.users WHERE email = @email AND password = @password",
    deletePatient: "DELETE FROM dbo.CuidadosPaliativos WHERE IdCuidadosPaliativos = @IdCuidadosPaliativos",
    getAllDianosticos: "SELECT CodigoOrgano, DescripcionOrgano FROM dbo.Organos",
    storeUser: "INSERT INTO dbo.users (run, [name], email, [password], IdState) VALUES (@Run, @Name, @Email, @Password, 1)",
    getUserbyEmail: "SELECT * FROM dbo.users WHERE email = @Email",
    getQuantityControls: "SELECT DISTINCT TipoControl, COUNT(IdControl) AS Cantidad FROM dbo.Controles GROUP BY TipoControl",
    getTotalsDashboard: "SELECT COUNT(c.Run) AS Total, (SELECT COUNT(c1.Run) FROM dbo.CuidadosPaliativos AS c1 INNER JOIN dbo.PhoenixPaciente AS p1 ON c1.Run = p1.Fld_Rut WHERE p1.Fld_Sexo = 1) AS Hombres, (SELECT COUNT(c2.Run) FROM dbo.CuidadosPaliativos AS c2 INNER JOIN dbo.PhoenixPaciente AS p2 ON c2.Run = p2.Fld_Rut WHERE p2.Fld_Sexo = 2) AS Mujeres, (SELECT COUNT(IdControl) FROM dbo.Controles) AS CantidadControles FROM dbo.CuidadosPaliativos AS c INNER JOIN dbo.PhoenixPaciente AS p ON c.Run = p.Fld_Rut",
    getLastControls: "SELECT TOP 10 IdControl, CONVERT(VARCHAR,FechaControl,103) AS FechaControl, p.Fld_Rut AS RunSinDv, CONCAT(p.Fld_Rut, '-', p.Fld_Dv) AS Run ,CONCAT(p.Fld_Nombres, ' ', p.Fld_PrimerApellido, ' ', p.Fld_SegundoApellido) AS Nombres, TipoControl, Observaciones, FechaRegistro FROM PruebasAlex.dbo.Controles AS c INNER JOIN dbo.PhoenixPaciente AS p ON c.Run = p.Fld_Rut ORDER BY c.FechaRegistro DESC",
    getQuantityControlsByDate: "SELECT CONVERT(varchar, FechaControl, 103) AS FechaControl, COUNT(*) AS Cantidad FROM PruebasAlex.dbo.Controles GROUP BY FechaControl ORDER BY FechaControl ASC",
    getAllUsers: "SELECT run, name, email, Idstate, CASE WHEN Idstate = 1 THEN 'Activo/a' ELSE 'Inactivo' END AS estado FROM dbo.users",
    updatePatientStateByRun: "UPDATE dbo.CuidadosPaliativos SET Estado = 1 WHERE Run = @Run",
    searchPatient: "SELECT TOP 5 Fld_Rut AS Run, CONCAT(Fld_Rut, '-', Fld_Dv) AS RunCompleto, CONCAT(p.Fld_Nombres, ' ', p.Fld_PrimerApellido, ' ', p.Fld_SegundoApellido) AS Nombres FROM PruebasAlex.dbo.CuidadosPaliativos c INNER JOIN PhoenixPaciente AS p ON c.Run = p.Fld_Rut WHERE (Fld_Rut LIKE +@Busqueda + '%' OR p.Fld_Nombres LIKE @Busqueda+ '%' OR p.Fld_PrimerApellido LIKE @Busqueda+ '%' OR p.Fld_SegundoApellido LIKE @Busqueda+ '%')",
    setpatientDischarge: "UPDATE dbo.CuidadosPaliativos SET Estado =  @tipoEstado, MotivoAlta = @MotivoAlta, FechaEstado = GETDATE(), Fallecido = null WHERE Run = @Run",
    setpatientDeceased: "UPDATE dbo.CuidadosPaliativos SET Fallecido =  1 WHERE Run = @Run",
    deleteUser: "DELETE FROM dbo.users WHERE run = @runUser",
    updateUser : "UPDATE dbo.users SET run = @Run,  email = @Email, name = @Name, password = @Password, IdState = @IdState WHERE run = @Run"
}