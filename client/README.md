# Vehicle Tracking Application

A web application for tracking vehicle movements on a map. The application displays the current location and path of a vehicle with options to view historical data, configure settings, and playback routes.

## Features

- **Map and Satellite Views**: Toggle between map and satellite views.
- **Playback Controls**: Play, pause, and adjust playback speed for vehicle paths.
- **Configuration Box**: Select between wired and wireless configurations, and choose date ranges for data display.
- **Data Display**: View vehicle paths for today, yesterday, this week, previous week, this month, previous month, and custom date ranges.
- **Markers**: Customize marker colors for start and end points of the vehicle path.

## Technologies

- **React**: Front-end library for building the user interface.
- **Google Maps API**: For displaying maps and vehicle paths.
- **CSS**: For styling and layout.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Google Maps API Key

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/vehicle-tracking.git
    cd vehicle-tracking
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up Google Maps API Key**

   - Obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a `.env` file in the root directory and add your API key:

     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

### Usage

1. **Start the development server**

    ```bash
    npm start
    ```

2. **Open your browser**

   Navigate to `http://localhost:3000` to view the application.

### Configuration

- **Map and Satellite Toggle**: Use the top-left button to switch between map and satellite views.
- **Playback Controls**: The play icon and playback speed options are located above the configuration box.
- **Configuration Box**: Located at the bottom center. Select configurations and date ranges as needed.

### Example of Use

- Click "Show" to view the vehicle's path according to the selected data range.
- Click "Play" to start the playback of the vehicle's route. Use the playback speed control to adjust the speed.

## Troubleshooting

- **Google Maps Error**: Ensure that you have set up the API key correctly and have enabled the necessary APIs in the Google Cloud Console.
- **CSS Styling Issues**: Check for conflicting styles or incorrect CSS rules in your stylesheet.

## Contributing

Feel free to submit issues or pull requests. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Maps API for providing mapping services.
- React for building the user interface.

