use ::lib::handler;
use ::lib::LambdaError;
use lambda_runtime::handler_fn;

#[tokio::main]
async fn main() -> Result<(), LambdaError> {
    println!("execute bootstrap#main");
    let runtime_handler = handler_fn(handler);
    lambda_runtime::run(runtime_handler).await?;
    Ok(())
}
