let instruction = `triangle(...) is a function that solves a right triangle given a combination of 2 input parameters
The syntax is: triangle(value1, "parameter1", value2, "parameter2")
Supported parameters are:
- leg
- hypotenuse
- adjacent angle
- opposite angle
- angle
Angle values should be given in degrees

Supported combinations are:
- two legs
- a leg and hypotenuse
- a leg and adjacent angle
- a leg and opposite angle
- hypotenuse and an angle

If a triangle is solved correctly, "success" is returned
If input parameters are wrong, "failed" is returned
If a triangle is solved incorrectly, an error message is returned`

console.log(instruction);

const triangle = function () {
    let tri = {
        "leg": undefined,
        "hypotenuse": undefined,
        "adjacent angle": undefined,
        "opposite angle": undefined,
        "angle": undefined
    }
    if (arguments.length !== 4 || typeof arguments[0] != "number" || typeof arguments[2] != "number") {
        console.log("Read the instructions again");
        return "failed";
    }
    if (arguments[3] == "leg" && arguments[1] == "leg") {
        tri.leg = [arguments[0], arguments[2]];
    }
    else {
        tri[arguments[3]] = arguments[2];
        tri[arguments[1]] = arguments[0];   
    }

    if (tri.leg <= 0 ||
        (typeof tri.leg == "object" && (tri.leg[0] <= 0 || tri.leg[1] <= 0)) ||
        tri.hypotenuse <= 0 ||
        tri["adjacent angle"] <= 0 ||
        tri["opposite angle"] <= 0 ||
        tri.angle <= 0) {
            let message = "Zero or negative input";
            console.log(message);
            return message;
    }

    if (typeof tri.leg == "object") {
        let result = solveTwoLeg(tri.leg[0], tri.leg[1]);
        if (result[0] == false) return result[1];
        else return "success";
    }
    if (tri.leg && tri.hypotenuse) {
        let result = solveLegHypotenuse(tri.leg, tri.hypotenuse);
        if (result[0] == false) return result[1];
        else return "success";
    }
    if (tri.leg && tri["adjacent angle"]) {
        let result = solveLegAdjacent(tri.leg, tri["adjacent angle"]);
        if (result[0] == false) return result[1];
        else return "success";
    }
    if (tri.leg && tri["opposite angle"]) {
        let result = solveLegOpposite(tri.leg, tri["opposite angle"]);
        if (result[0] == false) return result[1];
        else return "success";
    }
    if (tri.hypotenuse && tri.angle) {
        let result = solveHypotenuseAngle(tri.hypotenuse, tri.angle);
        if (result[0] == false) return result[1];
        else return "success";
    }

    console.log("Read the instructions again");
    return "failed";
}

const deg2rad = function(deg) {
    return deg * (Math.PI / 180);
}
const rad2deg = function(rad) {
    return rad * (180 / Math.PI);
}

const checkFalsePositives = function(a, b, c, alpha, beta) {
    if (alpha <= 0 || beta <= 0 || a <= 0 || b <= 0 || c <= 0) {
        let message = "Zero or negative value detected";
        console.log(message);
        return [true, message];
    }
    if (alpha >= 90 || beta >= 90) {
        let message = "Acute angle is 90 or more degrees";
        console.log(message);
        return [true, message];
    }
    if (a >= c || b >= c) {
        let message = "Leg is same lenghts or longer than hypotenuse";
        console.log(message);
        return [true, message];
    }
    return [false]
}

const printTriangle = function(a, b, c, alpha, beta) {
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);
}

const solveTwoLeg = function(a, b) {
    let c = Math.sqrt(a * a + b * b);
    let alpha = rad2deg(Math.atan(a / b));
    let beta = 90 - alpha
    
    let check = checkFalsePositives(a, b, c, alpha, beta);
    if (check[0]) return [false, check[1]];

    printTriangle(a, b, c, alpha, beta);
    return [true];
}

const solveLegHypotenuse = function(b, c) {
    let a = Math.sqrt(c*c - b*b);
    let alpha = rad2deg(Math.atan(a / b));
    let beta = 90 - alpha
    
    let check = checkFalsePositives(a, b, c, alpha, beta);
    if (check[0]) return [false, check[1]];

    // Swap print arguments to show the input leg as 'a'
    printTriangle(b, a, c, beta, alpha);
    return [true];
}

const solveLegAdjacent = function(b, alpha) {
    let c = b / Math.cos(deg2rad(alpha));
    let a = b * Math.tan(deg2rad(alpha));
    let beta = 90 - alpha;

    let check = checkFalsePositives(a, b, c, alpha, beta);
    if (check[0]) return [false, check[1]];

    // Swap print arguments to show the input leg as 'a'
    printTriangle(b, a, c, beta, alpha);
    return [true];
}

const solveLegOpposite = function(b, beta) {
    let c = b / Math.sin(deg2rad(beta));
    let alpha = 90 - beta;
    let a = b * Math.tan(deg2rad(alpha));

    let check = checkFalsePositives(a, b, c, alpha, beta);
    if (check[0]) return [false, check[1]];

    // Swap print arguments to show the input leg as 'a'
    printTriangle(b, a, c, beta, alpha);
    return [true];
}

const solveHypotenuseAngle = function(c, beta) {
    let alpha = 90 - beta;
    let a = c * Math.sin(deg2rad(alpha));
    let b = c * Math.sin(deg2rad(beta));

    let check = checkFalsePositives(a, b, c, alpha, beta);
    if (check[0]) return [false, check[1]];

    printTriangle(a, b, c, alpha, beta);
    return [true];
}
