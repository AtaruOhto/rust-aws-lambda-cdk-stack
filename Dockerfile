# syntax = docker/dockerfile:experimental

# This Dockerfile is used for building a rust binary.
FROM rust:1.54-slim AS builde-stage

WORKDIR /app

COPY Cargo.toml .
COPY Cargo.lock .
COPY src ./src
RUN cargo install --path .
RUN --mount=type=cache,target=/usr/local/cargo/registry \
  --mount=type=cache,target=/app/target \
  cargo build --release

FROM scratch AS export-stage
WORKDIR /app
COPY --from=builde-stage /app/target /
