use lambda_http::{lambda_runtime::Context, IntoResponse, Request, Response};
// use serde_json::json;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

pub async fn hello(_request: Request, _: Context) -> Result<impl IntoResponse, Error> {
    // let json = json!({
    //     "name": "John Doe",
    //     "age": 43,
    //     "phones": [
    //         "+44 1234567",
    //         "+44 2345678"
    //     ]
    // });

    let json = format!(r#"{{"name": "{}"}}"#, "hello");
    Ok(Response::builder()
        .status(200)
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Methods", "OPTIONS,POST,GET")
        .header("Access-Control-Allow-Credential", "true")
        .header("Access-Control-Allow-Origin", "*")
        .body(json)
        .expect("failed to render response"))
}

// async fn func(event: Request, _: Context) -> Result<impl IntoResponse, Error> {
//     Ok(match event.query_string_parameters().get("first_name") {
//         Some(first_name) => format!("Hello, {}!", first_name).into_response(),
//         _ => Response::builder()
//             .status(400)
//             .body("Empty first name".into())
//             .expect("failed to render response"),
//     })
// }
