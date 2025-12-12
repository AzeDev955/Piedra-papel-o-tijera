import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: Falta el token" });
    }
    const token = authHeader.startsWith("Bearer ") //esto soluciona todo
      ? authHeader.slice(7)
      : authHeader;

    const verificado = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verificado;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

export default authMiddleware;
