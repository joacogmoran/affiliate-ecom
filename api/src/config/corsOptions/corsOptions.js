
const allowedOrigins = ['https://online-store-client-liart.vercel.app'];

const corsOptions = {
    origin: (origin, cb) => {
        // origin = request origin / cb = allow origin or not
        if (!origin || allowedOrigins.indexOf(origin) !== -1) cb(null, true);
        else cb(null, false);
    },
    optionsSuccessStatus: 200
};

module.exports = {allowedOrigins, corsOptions}