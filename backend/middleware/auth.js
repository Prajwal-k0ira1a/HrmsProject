export function author(req,res,next){
    console.log("This is middleware");
    next();

}