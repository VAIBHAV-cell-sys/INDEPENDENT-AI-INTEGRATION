

# Flask LLM Chatbot (find this at https://independent-ai-integration-7.onrender.com)

This repository contains a Flask application designed to integrate with various Large Language Models (LLMs) via different providers, such as OpenAI, Perplexity, DeepSeek, and AIML API, among others. The app allows users to interact with these models through a web interface to generate responses to their inputs, create action plans, and identify potential challenges for specific goals.

## Features

* **Multiple LLM Providers**: Seamlessly interact with models from OpenAI, Perplexity, DeepSeek, AIML API, and a local LLaMA model.
* **Dynamic Model Switching**: Change models at runtime via API or session settings.
* **Challenge Generation**: Generate a list of realistic obstacles or challenges for a specific goal.
* **Action Plan Generation**: Create a step-by-step plan for overcoming challenges or achieving a goal.
* **Web Interface**: A simple chat interface to interact with the LLMs.

## Requirements

To run this project, you need the following dependencies installed:

* Python 3.7+
* Flask 3.1.1
* OpenAI 1.100.2 (for OpenAI API)
* Langchain 0.0.1 (for local LLaMA model support)
* requests 2.32.4
* Python-dotenv 1.1.1 (for environment variable management)
* Other dependencies listed in `requirements.txt`

## Setup

### 1. Clone the Repository

```bash
git clone (paste link here)
cd your-repo-name
```

### 2. Install Dependencies

Ensure you have a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate   # For Linux/MacOS
venv\Scripts\activate      # For Windows
```

Then, install the required dependencies:

```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project to store your sensitive information such as API keys for OpenAI, Perplexity, DeepSeek, and AIML API.

Example `.env` file:

```env
OPENAI_API_KEY=your-openai-api-key
PERPLEXITY_API_KEY=your-perplexity-api-key
DEEPSEEK_API_KEY=your-deepseek-api-key
AIMLAPI_API_KEY=your-aimlapi-api-key
```

### 4. Run the Flask Application

To start the application locally:

```bash
python app.py
```

This will start the server on `http://127.0.0.1:8080`.

### 5. Access the Web Interface

Open your browser and navigate to `http://127.0.0.1:8080` to interact with the chatbot. You can send queries to the model and get responses.

## Routes

### `/`

The main route that renders the `chat.html` page where the user can interact with the chatbot.

### `/set_model` (POST)

Sets the current LLM model provider and API key for the session. You can change the model dynamically by sending a POST request with the `model` and `api_key` parameters.

**Example Request:**

```json
{
  "model": "openai",
  "api_key": "your-api-key"
}
```

**Response:**

```json
{
  "status": "Model updated"
}
```

### `/generate_challenges` (POST)

Generates a list of challenges based on a user’s goal.

**Example Request:**

```json
{
  "goal": "Become a data scientist"
}
```

**Response:**

```json
{
  "challenges": [
    "1. Master machine learning algorithms.",
    "2. Build a solid understanding of statistics and data analysis.",
    "3. Gain hands-on experience with large datasets."
  ]
}
```

### `/generate_plan` (POST)

Generates an action plan based on the list of challenges provided by the user.

**Example Request:**

```json
{
  "challenges[]": ["Master machine learning algorithms", "Gain hands-on experience with large datasets"]
}
```

**Response:**

```json
{
  "plan": "1. Take an online course in machine learning. 2. Participate in Kaggle competitions. 3. Build a personal portfolio with datasets."
}
```

### `/get` (POST)

Send a chat message to the model and receive a response.

**Example Request:**

```json
{
  "msg": "What are the key skills needed to become a data scientist?"
}
```

**Response:**

```json
{
  "answer": "The key skills needed to become a data scientist include statistics, machine learning, programming (Python or R), and data visualization."
}
```

## LLM Providers

This application supports various LLM providers. The available models for each provider are as follows:

### 1. **OpenAI**

* Models: `gpt-3.5-turbo`, `gpt-4-o-mini`, etc.

### 2. **Perplexity**

* Models: `sonar-small-online`, `sonar-medium-online`, `sonar-large-online`

### 3. **DeepSeek**

* Models: `deepseek-chat`, `deepseek-coder`

### 4. **AIML API**

* Models: `gpt-4o`

### 5. **Local LLaMA**

* This supports models like `llama-2-7b-chat.ggmlv3.q4_0.bin`, which can be hosted locally.

You can switch between these models dynamically by sending a request to the `/set_model` route.

## Debugging and Logs

You can view logs by running the app in debug mode. It will provide detailed error messages in the terminal to help you troubleshoot any issues.

```bash
python app.py
```

### Logging Output

The app logs LLM responses to the console, so you can monitor how well the model is working or debug any issues related to response generation.

## Conclusion

This project allows you to interact with multiple LLMs and utilize them for different NLP tasks. You can integrate additional LLM providers by extending the `LLMRouter` class and adding the required API interactions. Happy building!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


