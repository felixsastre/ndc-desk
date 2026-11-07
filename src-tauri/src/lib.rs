//! Application setup shared by every desktop build.

/// Builds the Tauri application and runs it until the window closes.
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("failed to run ndc-desk");
}
