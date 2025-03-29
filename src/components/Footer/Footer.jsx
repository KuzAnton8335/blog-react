import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	const newDate = new Date().toLocaleString('ru', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=e7e2c704c847621dbbd3eb4f91de2035',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Блок веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city}, {newDate}
				</div>
				<div>
					{temperature}℃, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 920px;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	box-shadow: 0 -7px 35px 9px #616161;
	background-color: #fff;
`;
