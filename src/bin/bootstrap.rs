use lambda_http::{
    handler,
    lambda_runtime::{self, Error},
};
use lib::hello;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_runtime::run(handler(hello)).await?;
    Ok(())
}
