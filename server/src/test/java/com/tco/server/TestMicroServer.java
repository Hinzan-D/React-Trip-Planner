package com.tco.server;

import org.json.JSONObject;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

import spark.Spark;

public class TestMicroServer {

    public final static int TEST_SERVER_PORT = 8000;
    public final static String BASE_URL = "http://localhost:" + TEST_SERVER_PORT;

    @BeforeAll
    public static void initialize() {
        new MicroServer(TEST_SERVER_PORT);
    }

    @AfterAll
    public static void stopSparkInternal() {
        Spark.stop();
        Spark.awaitStop();
    }

    public static HttpResponse postRequest(String endPointPath, String requestBodyJSON) throws IOException {
        Spark.awaitInitialization(); // make sure spark is started before making the request

        HttpPost request = new HttpPost(BASE_URL + endPointPath);
        request.setEntity(new StringEntity(requestBodyJSON, ContentType.APPLICATION_JSON));

        HttpClient httpClient = HttpClientBuilder.create().build();
        return httpClient.execute(request);
    }

    @Test
    @DisplayName("Valid config request succeeds with 200 status")
    public void testValidConfigRequest() throws IOException {
        String requestBodyJSON = new JSONObject()
                .put("requestType", "config")
                .toString();

        HttpResponse response = postRequest("/api/config", requestBodyJSON);
        assertEquals(200, response.getStatusLine().getStatusCode());
    }

    @Test
    @DisplayName("An invalid request responds with 400 status")
    public void testInvalidRequest() throws IOException {
        String invalidJSON = "{ 'invalid': 'request' }";

        HttpResponse response = postRequest("/api/config", invalidJSON);
        assertEquals(400, response.getStatusLine().getStatusCode());
    }
}