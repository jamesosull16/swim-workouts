DROP DATABASE IF EXISTS swim_workoutsDB;
CREATE DATABASE swim_workoutsDB;
USE swim_workoutsDB;
CREATE TABLE workouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total_distance INT,
  category VARCHAR(30),
  wu VARCHAR (45),
  ms VARCHAR (10000),
  cd VARCHAR (45)
)

 {{!-- <button data-id="{{this.id}}" class="delquote">Delete</button>

        {{!-- <a href="/{{this.id}}">Update this quote</a> --}} --}}