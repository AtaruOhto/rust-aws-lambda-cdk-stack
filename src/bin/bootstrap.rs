use lambda_http::{
    handler,
    lambda_runtime::{self, Context, Error},
    IntoResponse, Request, RequestExt, Response,
};

use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_runtime::run(handler(func)).await?;
    Ok(())
}

async fn func(event: Request, _: Context) -> Result<impl IntoResponse, Error> {
    Ok(match event.query_string_parameters().get("argument") {
        Some(arg) => json!({ "message": format!("Hello {}! ", arg) })
            .to_string()
            .into_response(),
        _ => Response::builder()
            .status(400)
            .body(
                json!({
                    "message": "Oh... pelease give me an argument."
                })
                .to_string()
                .into(),
            )
            .expect("failed to render response"),
    })
}
