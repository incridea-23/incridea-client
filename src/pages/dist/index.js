"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getStaticProps = void 0;
var apollo_1 = require("@/src/lib/apollo");
var client_1 = require("@apollo/client");
var head_1 = require("next/head");
var generated_1 = require("../generated/generated");
var framer_motion_1 = require("framer-motion");
var button_1 = require("../components/button");
var react_1 = require("next-auth/react");
var link_1 = require("next/link");
var razorpay_1 = require("../utils/razorpay");
/* 3 data fetching options in Next.js:
1. Client-side rendering - useQuery is called on client-side.
2. Static rendering - getStaticProps is called at build time on server-side.
3. Server-side rendering - getServersideProps is called on every request.
*/
var Home = function () {
    var _a, _b;
    // 1. Client side rendering example
    var results = client_1.useQuery(generated_1.GetAllUsersDocument);
    var _c = react_1.useSession(), session = _c.data, status = _c.status;
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Incridea"),
            React.createElement("meta", { name: "description", content: "Official website for Incridea 2023" }),
            React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            React.createElement("link", { rel: "icon", href: "/favicon.ico" })),
        React.createElement("main", { className: "h-screen w-screen flex justify-center items-center flex-col gap-5" },
            React.createElement("div", { className: "text-2xl border-b border-gray-400" }, "Incridea '23"),
            React.createElement("div", { className: "text-center" },
                status === "loading" && React.createElement("div", null, "Loading..."),
                status === "authenticated" && (React.createElement("div", null,
                    React.createElement("div", null,
                        "Authenticated as ", (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 :
                        _a.data.email),
                    React.createElement("div", null,
                        "Session expires in ",
                        new Date(session === null || session === void 0 ? void 0 : session.expires).toLocaleString()),
                    session.user.data.role === "USER" ? (React.createElement("button", { onClick: razorpay_1.makePayment },
                        "Register for fest By Paying Pay 250",
                        " ")) : (React.createElement("p", null,
                        "Hello Participant your pid is ",
                        session.user.data.id)))),
                status === "unauthenticated" && React.createElement("div", null, "Not authenticated"),
                React.createElement("div", { className: "text-blue-500 mt-3" }, "Apollo Client + Framer Motion Demo"),
                React.createElement("div", { className: "flex flex-wrap justify-center gap-5 mt-5" },
                    results.loading && React.createElement("div", null, "Loading..."), (_b = results.data) === null || _b === void 0 ? void 0 :
                    _b.users.map(function (user) { return (React.createElement(framer_motion_1.motion.button
                    // gesture animation example
                    , { 
                        // gesture animation example
                        whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, 
                        // draggable example
                        drag: true, dragConstraints: {
                            top: -5,
                            bottom: 5
                        }, key: user.id, className: "border border-gray-400 rounded-lg p-5 hover:bg-gray-50 hover:border-black" },
                        React.createElement("div", null, user.name))); }))),
            React.createElement("div", { className: "text-center" },
                React.createElement("div", { className: "text-blue-500 mt-3" }, "class-variance-authority example"),
                React.createElement("div", { className: "flex flex-col sm:flex-row items-center gap-3" }, status === "authenticated" ? (React.createElement(button_1.Button, { onClick: function () {
                        react_1.signOut();
                    }, intent: "secondary", size: "medium", className: "rounded-xl mt-3 font-bold" // custom class
                 }, "Sign Out")) : (React.createElement(React.Fragment, null,
                    React.createElement(button_1.Button, { onClick: function () {
                            react_1.signIn();
                        }, intent: "primary", size: "small", className: "rounded-xl mt-3" }, "Login"),
                    React.createElement(button_1.Button, { intent: "primary", size: "small", className: "mt-3" },
                        React.createElement(link_1["default"], { href: "/auth/signup" }, "Sign Up")))))))));
};
exports["default"] = Home;
// 2. Static rendering example
exports.getStaticProps = function () { return __awaiter(void 0, void 0, void 0, function () {
    var apolloClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apolloClient = apollo_1.initializeApollo();
                return [4 /*yield*/, apolloClient.query({
                        query: generated_1.GetAllUsersDocument
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        props: { initialApolloState: apolloClient.cache.extract() }
                    }];
        }
    });
}); };
// 3. SSR: similaryl getServersideProps can be used instead of getStaticProps for SSR.
