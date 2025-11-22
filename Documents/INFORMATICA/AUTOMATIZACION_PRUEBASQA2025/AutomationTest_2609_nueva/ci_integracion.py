import time
import pytest
from selenium.webdriver import Chrome, ChromeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def initialize_driver():
    options = ChromeOptions()
    options.add_argument("--headless=new")    # ⭐ Necesario para GitHub Actions
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = Chrome(options=options)
    driver.get("https://opensource-demo.orangehrmlive.com/")
    driver.maximize_window()
    return driver


def login(driver):
    driver.find_element(By.NAME, "username").send_keys("Admin")
    driver.find_element(By.NAME, "password").send_keys("admin123")
    driver.find_element(By.XPATH, '//button[@type="submit"]').click()

    WebDriverWait(driver, 10).until(EC.url_contains("dashboard"))
    print("✅ Login OK")


def ir_a_PIM(driver):
    WebDriverWait(driver, 20).until(EC.url_contains("dashboard"))

    pim_element = WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH, '//span[text()="PIM"]'))
    )

    driver.execute_script("arguments[0].scrollIntoView(true)", pim_element)
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//span[text()="PIM"]')))
    
    pim_element.click()
    print("✅ Ingresando al módulo PIM")

    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH, '//h5[text()="Employee Information"]'))
    )
    print("✅ Employee Information cargado")


def buscar_id(driver, id="0312"):
    campo_id = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, '//label[text()="Employee Id"]/../following-sibling::div/input')
        )
    )
    campo_id.clear()
    campo_id.send_keys(id)

    print(f"ID '{id}' ingresado en el campo Employee Id")

    boton_search = driver.find_element(By.XPATH, '//button[@type="submit"]')
    boton_search.click()

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//div[@class="oxd-table-body"]'))
    )

    print("✅ Resultados de búsqueda cargados OK")


# 🔥 TEST PARA GITHUB ACTIONS
def test_orangehrm_busqueda_id():
    driver = initialize_driver()

    try:
        login(driver)
        ir_a_PIM(driver)
        buscar_id(driver, "0312")
        print("🔥 Prueba finalizada con éxito.")
    finally:
        driver.quit()
