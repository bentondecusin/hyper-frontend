cockroach start-single-node --insecure \
--listen-addr=localhost:26257 \
--http-addr=localhost:8080 \
--store=node1
--background \

cockroach sql --insecure 

CREATE TABLE german (month numeric, age numeric, credit numeric, installment_plans numeric, credit_amount numeric, number_of_credits numeric, employment numeric, purpose numeric, sex numeric, housing numeric, residence_since numeric, credit_history numeric, property numeric, foreign_worker numeric, investment_as_income_percentage numeric, people_liable_for numeric, telephone numeric, other_debtors numeric, status numeric, skill_level numeric, savings numeric);

IMPORT INTO german (month,age,credit,installment_plans,credit_amount,number_of_credits,employment,purpose,sex,housing,residence_since,credit_history,property,foreign_worker,investment_as_income_percentage,people_liable_for,telephone,other_debtors,status,skill_level,savings) CSV DATA ('http://localhost:3030/german.csv') WITH skip = '1';

SELECT * FROM german;

SELECT AVG(credit) , status FROM german GROUP BY status;
SELECT COUNT(credit) , status FROM german GROUP BY status;

# may give multiple rows
SELECT AVG (credit) FROM german GROUP BY status

# may give multiple columns
SELECT AVG(credit), AVG(credit_history) FROM german WHERE credit=1.0 