using CognitiveRelay.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace CognitiveRelay
{
  public class AzureCognitiveServiceProvider : IAzureCognitiveServiceProvider
  {
    private readonly string _apiUrl;
    private readonly string _apiKey;
    public AzureCognitiveServiceProvider(IConfiguration config)
    {
      _apiUrl = config.GetValue<string>("sentimentApiUrl");
      _apiKey = config.GetValue<string>("sentimentApiKey");
    }

    public async Task<SentimentResponse> AnalyzeSentiment(Comment comment)
    {
      var client = new HttpClient();
      client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _apiKey);
      try
      {
        var httpResponse = await client.PostAsJsonAsync<SentimentRequest>(
            _apiUrl,
            comment.ToSentimentRequest());
        return await httpResponse.Content.ReadAsAsync<SentimentResponse>();
      }
      catch (InvalidOperationException x)
      {
        throw new InvalidOperationException($"Post ApiUrl: {_apiUrl} ", x);
      }
    }
  }
}
