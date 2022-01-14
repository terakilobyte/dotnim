using Microsoft.AspNetCore.Mvc;

namespace interview.Controllers;

[ApiController]
[Route("api/[controller]")]

public class NimGameController : ControllerBase
{

    private readonly ILogger<NimGameController> _logger;
    public NimGameController(ILogger<NimGameController> logger)
    {
        _logger = logger;
    }

    [HttpPost]

    public IActionResult Post([FromBody] Nimput nimput)
    {
        return Ok(nimput);
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("NimGameController.Get()");
        return Ok(new { nim = 3 });
    }
}
